import pyotp
import requests
import base64
import json
import sys
from urllib import parse
# Provide the main function with the url to the reactivation QR code. Example:
# "https://api-e4c9863e.duosecurity.com/frame/qr?value=c53Xoof7cFSOHGxtm69f-YXBpLWU0Yzk4NjNlLmR1b3NlY3VyaXR5LmNvbQ"
# 
# How to get QR code:
# log in on start.nyu.edu
# click "NYU Multi-Factor Authentication Registration & Update"
# you will see a list of your pre-registered devices
# if you don't have any MFA devices, click "Add a new device" and follow instructions
# assuming you have one, click "My Settings & Devices"
# select your device from the list and click "Device Options" > "Reactivate Duo Mobile"
# select options that match your device and click "I have Duo Mobile installed"
# right click on the QR code that shows up and copy image address 
# 
# The counter for HOTP (counter based) will start from 0.
# Duo doesn't seem to support TOTP (time based).

def main(qr_url):
	data = parse.unquote(qr_url.split('=')[1])                 # get ?value=XXX
	code = data.split('-')[0].replace('duo://', '')            # first half of value is the activation code
	hostb64 = data.split('-')[1]                               # second half of value is the hostname in base64
	host = base64.b64decode(hostb64 + '='*(-len(hostb64) % 4)) # Same as "api-e4c9863e.duosecurity.com"


	url = 'https://{host}/push/v2/activation/{code}'.format(host=host.decode("utf-8"), code=code)
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
