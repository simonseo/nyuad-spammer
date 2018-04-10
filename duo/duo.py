import pyotp
import requests
import base64
import json
import sys
from urllib import parse

SECRETFILE = 'secrets.json'

def qr_url_to_secret(qr_url):
	'''Activates the QR url and saves HOTP key '''

	#--- Create request URL
	data = parse.unquote(qr_url.split('?value=')[1])           # get ?value=XXX
	code = data.split('-')[0].replace('duo://', '')            # first half of value is the activation code
	hostb64 = data.split('-')[1]                               # second half of value is the hostname in base64
	host = base64.b64decode(hostb64 + '='*(-len(hostb64) % 4)) # Same as "api-e4c9863e.duosecurity.com"
	url = 'https://{host}/push/v2/activation/{code}'.format(host=host.decode("utf-8"), code=code) # this api is not publicly known
	print(url)

	#--- Get response which will be a JSON of secret keys, customer names, etc.
	#--- Expected Response: {'response': {'hotp_secret': 'blahblah123', ...}, 'stat': 'OK'}
	#--- Expected Error: {'code': 40403, 'message': 'Unknown activation code', 'stat': 'FAIL'}
	response = requests.post(url)
	response_dict = json.loads(response.text)
	if response_dict['stat'] == 'FAIL':
		raise Exception("The given URL is invalid. Try a new QR URL: {}".format(qr_url))
	print(response_dict)

	hotp_secret = response_dict['response']['hotp_secret']
	encoded_secret = base64.b32encode(hotp_secret.encode("utf-8"))
	return encoded_secret

def save_secret(hotp_secret, count):
	'''Save to secrets.json
	hotp_secret should look like "b'MRRTMM3FHFTGMMRYGI2WKNRQGI3GMMZWME2TKNDCMNRWGMJQGZQQ===='" 
	count should be an int'''
	secrets = {
		"hotp_secret" : hotp_secret,
		"count" : count
	}
	with open(SECRETFILE, "w") as f:
		json.dump(secrets, f)

def load_secret():
	with open(SECRETFILE, "r") as f:
		secret_dict = json.load(f)
	return secret_dict


def HOTP():
	'''Usage: generate = HOTP(); passcode = generate()'''
	#--- Create HOTP object
	secret_dict = load_secret()
	count = secret_dict.get("count", 0)
	hotp_secret = secret_dict.get("hotp_secret")
	hotp = pyotp.HOTP(secret)   # As long as the secret key is the same, the HOTP object is the same

	#--- Generate new passcode
	def generate():
		passcode = hotp.at(count)
		count += 1
		save_secret(hotp_secret, count)
		return passcode
	return generate


if __name__ == '__main__':
	if len(sys.argv) < 2:
		print("Usage: python3 duo.py <url-to-duo-qr>")
		exit()
	qr_url = sys.argv[1]
	hotp_secret = qr_url_to_secret(qr_url)
	save_secret(hotp_secret, count=0)

	# Generate 10 OTPs!
	# You may use any OTP but all previous OTPs will become invalid
	print("HOTP Secret:", hotp_secret)
	print("First 10 One Time Passwords:")
	generateOTP = HOTP()
	for i in range(10):
		print(generateOTP())
