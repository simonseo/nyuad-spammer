#!/usr/bin/python
# -*- coding: utf-8 -*- 
# @File Name: scrapper.py
# @Created:   2018-04-11 02:57:12  Simon Myunggun Seo (simon.seo@nyu.edu) 
# @Updated:   2018-04-11 04:45:02  Simon Seo (simon.seo@nyu.edu)
import sys, time
sys.path.insert(0,'..')
from duo import duo

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup as bs

def getAnnouncementJson(nyu_netid, nyu_password):
	options = webdriver.ChromeOptions()
	options.add_argument('headless')
	driver = webdriver.Chrome(chrome_options=options)
	driver.implicitly_wait(10)
	main_window = driver.current_window_handle
	driver.get("https://students.nyuad.nyu.edu/apps/announcements/index")

	if "NYU Login" in driver.title:
		# Normal Auth
		print("Authenticating NYU Shibboleth")
		username_box = driver.find_element_by_name("j_username")
		username_box.clear(); username_box.send_keys(nyu_netid)

		password_box = driver.find_element_by_name("j_password")
		password_box.clear(); password_box.send_keys(nyu_password)

		password_box.send_keys(Keys.RETURN)
		time.sleep(5)
	if "NYU Login" in driver.title:
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

	jsonStr = driver.find_element_by_tag_name('body').text
	driver.close()
	return jsonStr

if __name__ == '__main__':
	from secrets import NYU_NETID, NYU_PASSWORD
	jsonStr = getAnnouncementJson(NYU_NETID, NYU_PASSWORD)
	print(jsonStr[:500])
	