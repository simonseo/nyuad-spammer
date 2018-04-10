import pyotp
import requests
import base64
import json
import sys
from urllib import parse

def qr_url_to_secret(qr_url):
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

	#--- Save to secrets.json
	with open("secrets.json", "w") as f:
		secrets = {}
		secrets["hotp_secret"] = response_dict['response']['hotp_secret']
		secrets["count"] = 0
		json.dump(secrets, f)

	hotp_secret = response_dict['response']['hotp_secret']
	secret = base64.b32encode(hotp_secret.encode("utf-8"))
	print("HOTP Secret:", secret) # As long as the secret key is the same, 
	hotp = pyotp.HOTP(secret)     # the HOTP object is the same

	# Generate 10 OTPs! 
	# You may use any OTP but all previous OTPs will become invalid 
	print("First 10 One Time Passwords!")
	for i in range(10):
		print(hotp.at(i))

	return secret

def HOTP():
	'''Usage: generate = HOTP(); passcode = generate()'''
	#--- Create HOTP object
	with open("secrets.json", "r") as f:
		secret_dict = json.load(f)
		secret = secret_dict.get("hotp_secret")
	secret = base64.b32encode(secret.encode("utf-8"))
	hotp = pyotp.HOTP(secret)

	#--- Generate new passcode
	def generate():
		count = secret_dict.get("count", 0)
		passcode = hotp.at(count)
		secret_dict["count"] = count + 1
		with open("secrets.json", "w") as f:
			secret_dict = json.dump(secret_dict, f)
		return passcode
	return generate


if __name__ == '__main__':
	if len(sys.argv) < 2:
		print("Usage: python3 duo.py <url-to-duo-qr>")
		exit()
	qr_url = sys.argv[1]
	qr_url_to_secret(qr_url)
