## Duo HOTP creator

### Usage
Provide the main function with the url to the reactivation QR code. Example:
"https://api-e4c9863e.duosecurity.com/frame/qr?value=c53Xoof7cFSOHGxtm69f-YXBpLWU0Yzk4NjNlLmR1b3NlY3VyaXR5LmNvbQ"


### How to get QR code:
1. log in on start.nyu.edu
1. click "NYU Multi-Factor Authentication Registration & Update"
1. you will see a list of your pre-registered devices
1. if you don't have any MFA devices, click "Add a new device" and follow instructions
1. assuming you have one, click "My Settings & Devices"
1. select your device from the list and click "Device Options" > "Reactivate Duo Mobile"
1. select options that match your device and click "I have Duo Mobile installed"
1. right click on the QR code that shows up and copy image address 

### Caution
- The counter for HOTP (counter based) will start from 0.
- Duo doesn't seem to support TOTP (time based).
- If you reactivated a device that actually exists, it will be inactive now. ie. if your phone was registered and you used the phone as the device to reactivate, the HOTP key in your phone becomes invalid. Thus a push/passcode function will not work anymore. (SMS/call will probably not work either) 
