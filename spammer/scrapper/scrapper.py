#!/usr/bin/python
# -*- coding: utf-8 -*-
# @File Name: scrapper.py
# @Created:   2018-04-11 02:57:12  Simon Myunggun Seo (simon.seo@nyu.edu)
# @Updated:   2018-04-18 17:08:14  Simon Seo (simon.seo@nyu.edu)
import sys, time
sys.path.insert(0,'..')
from duo import duo
from scrapper.secrets import NYU_NETID, NYU_PASSWORD

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from contextlib import contextmanager

import requests, json

@contextmanager
def headlessDriver():
	options = webdriver.ChromeOptions()
	options.add_argument('headless')
	driver = webdriver.Chrome(chrome_options=options)
	driver.implicitly_wait(10)
	yield driver
	driver.close()

def authenticate(driver):
	if "NYU Login" in driver.title:
		# Normal Auth
		print("Authenticating NYU Shibboleth")
		username_box = driver.find_element_by_name("j_username")
		username_box.clear(); username_box.send_keys(NYU_NETID)

		password_box = driver.find_element_by_name("j_password")
		password_box.clear(); password_box.send_keys(NYU_PASSWORD)

		password_box.send_keys(Keys.RETURN)
		time.sleep(5)

		# Duo MFA
		print("Authenticating Duo MFA")
		driver.switch_to_frame(driver.find_element_by_id("duo_iframe"))
		bypass_button = driver.find_element_by_id("passcode") # "PASSCODE" button that switches to "LOG IN" button
		bypass_button.click()

		generateOTP = duo.HOTP()
		passcode = generateOTP()

		passcode_box = driver.find_element_by_name("passcode")
		passcode_box.clear(); passcode_box.send_keys(passcode)
		bypass_button.click()

		driver.switch_to_default_content()
		time.sleep(3)

def getAnnouncementJson(driver):
	print("Retrieving Student Portal Announcements")
	driver.get("https://students.nyuad.nyu.edu/apps/announcements/index")
	if "NYU Login" in driver.title:
		authenticate(driver)
	jsonStr = driver.find_element_by_tag_name('body').text
	return jsonStr

def send(jsonStr):
	print("sending data: ", jsonStr[:100], "\n======")
	# write code to send jsonStr to DB server here...
	url = "http://127.0.0.1:5000/postJson"
	jsonStr = json.dumps(json.loads(jsonStr))
	r = requests.post(url=url, json=jsonStr)
	print("response from database server:", r.text)


def run(forEvery=5*60):
	with headlessDriver() as driver:
		jsonStr = getAnnouncementJson(driver)
	# jsonStr = json.dumps({"test":"testdata"})
	send(jsonStr)
	time.sleep(forEvery) # 5 minutes

if __name__ == '__main__':
	run()
