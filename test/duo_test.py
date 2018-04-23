#!/usr/bin/python
# -*- coding: utf-8 -*- 
# @File Name: duo_test.py
# @Created:   2018-04-12 00:11:28  Simon Myunggun Seo (simon.seo@nyu.edu) 
# @Updated:   2018-04-18 17:51:48  Simon Seo (simon.seo@nyu.edu)

from spammer.duo import duo


def testSecretJsonHasRightKeys():
	assert set(duo.load_secret().keys()) == {'hotp_secret', 'count'}

def testCreatesUniqueOneTimePasswords():
	generate = duo.HOTP()
	assert generate() != generate()

def testGeneratingPasswordIncrementsCounter():
	count_before = duo.load_secret().get('count')
	generate = duo.HOTP()
	generate()
	count_after = duo.load_secret().get('count')
	assert count_before + 1 == count_after

def testActivationUrlProducedFromQrUrl():
	qr_url = "https://api-e4c9863e.duosecurity.com/frame/qr?value=Oyh0m3VcSWAWoUZ0YA4o-YXBpLWU0Yzk4NjNlLmR1b3NlY3VyaXR5LmNvbQ"
	activation_url = "https://api-e4c9863e.duosecurity.com/push/v2/activation/Oyh0m3VcSWAWoUZ0YA4o"
	assert duo.qr_url_to_activation_url(qr_url) == activation_url


def testHotpSixDigits():
	generate = duo.HOTP()
	passcode = generate()
	assert len(passcode) == 6
	assert passcode.isnumeric()

