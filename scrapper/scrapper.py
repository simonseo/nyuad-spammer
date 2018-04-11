#!/usr/bin/python
# -*- coding: utf-8 -*- 
# @File Name: scrapper.py
# @Created:   2018-04-11 02:57:12  Simon Myunggun Seo (simon.seo@nyu.edu) 
# @Updated:   2018-04-11 05:04:37  Simon Seo (simon.seo@nyu.edu)
import sys, time
sys.path.insert(0,'..')
from duo import duo
from secrets import NYU_NETID, NYU_PASSWORD

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup as bs
from contextlib import contextmanager

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
		bypass_button = driver.find_elements_by_class_name("auth-button")[1] # 0th is push, 1st is passcode
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

def main():
	while(True):
		with headlessDriver() as driver:
			jsonStr = getAnnouncementJson(driver)

		# write code to send jsonStr to DB server here...

		time.sleep(5*60) # 5 minutes


if __name__ == '__main__':
	with headlessDriver() as driver:
		jsonStr = getAnnouncementJson(driver)
		print(jsonStr[:500])
	