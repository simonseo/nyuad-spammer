import csv
import requests, json
import sqlite3
import databaseOperations as db
from flask import jsonify


def getUsers():
	conn = sqlite3.connect('posts.db')
	c = conn.cursor()
	to_send={"users":[]}
	with conn:
		c.execute("SELECT userID from users")
		users_selected=c.fetchall()
		for user in users_selected:
			to_send["users"].append(user[0])

	conn.commit()
	conn.close()
	return jsonify(to_send)
