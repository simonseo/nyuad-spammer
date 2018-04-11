#!/usr/bin/python
# -*- coding: utf-8 -*- 
# @File Name: test_unittest.py
# @Created:   2018-04-12 00:11:44  Simon Myunggun Seo (simon.seo@nyu.edu) 
# @Updated:   2018-04-12 00:21:39  Simon Seo (simon.seo@nyu.edu)

import pytest

def func(x):
    return x + 1

def test_answer():
    assert func(4) == 5