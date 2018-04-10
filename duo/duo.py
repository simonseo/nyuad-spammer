import pyotp
import requests
import base64
import json
import sys
from urllib import parse

def main(qr_url):
	data = parse.unquote(qr_url.split('=')[1])                 # get ?value=XXX
	code = data.split('-')[0].replace('duo://', '')            # first half of value is the activation code
	hostb64 = data.split('-')[1]                               # second half of value is the hostname in base64
	host = base64.b64decode(hostb64 + '='*(-len(hostb64) % 4)) # Same as "api-e4c9863e.duosecurity.com"


	url = 'https://{host}/push/v2/activation/{code}'.format(host=host.decode("utf-8"), code=code) # this api is not publicly known
	print(url)
	response = requests.post(url)
	body = json.loads(response.text)
	print(body)

	hotp_secret = body['response']['hotp_secret']
	secret = base64.b32encode(hotp_secret.encode("utf-8"))
	print("HOTP Secret:", secret) # As long as the secret key is the same, 
	hotp = pyotp.HOTP(secret)     # the HOTP object is the same

	# Generate 10 OTPs! 
	# You may use any OTP but all previous OTPs will become invalid 
	print("First 10 One Time Passwords!")
	for i in range(10):
		print(hotp.at(i))

if __name__ == '__main__':
	if len(sys.argv) < 2:
		print("Usage: python3 duo.py <url-to-duo-qr>"); exit()
	qr_url = sys.argv[1]
	main(qr_url)
