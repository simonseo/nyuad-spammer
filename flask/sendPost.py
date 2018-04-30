import csv
import requests, json
import sqlite3
import databaseOperations as db

def SendPost(postID):
	conn = sqlite3.connect('posts.db')
	c = conn.cursor()
	message= db.getpost(postID)
	users=""
	with conn:
		c.execute("SELECT topic from posts where ID=?", (postID,))
	topic_of_post=c.fetchone()[0].lower().replace(" ", "")
	print("Topic of post is "+topic_of_post)
	with conn:
		c.execute("SELECT topic_id from topics where topic=?", (topic_of_post,))
	topic_id_of_post=c.fetchone()
	if topic_id_of_post:
		topic_id_of_post=topic_id_of_post[0]
		with conn:
			c.execute("SELECT userID from userSubscriptions where topic_id=?", (topic_id_of_post,))
		users_subscribed=c.fetchall()
		print(str(users_subscribed))
		for user in users_subscribed:
			print("adding "+user[0])
			users=users+user[0]+','
		users=users[:-1]

		data={}
		data["message"]=message
		data["users"]=users
		json_data = json.dumps(data)
		print(json_data)

		# jsonStr = open('samplesub.json', 'r').readline()
		print("sending data:\n")
		url = "http://127.0.0.1:3000"
		# # jsonStr = json.dumps(json.loads(jsonStr))
		r = requests.post(url=url, json=json_data)
		# print("response from database server:\n", r.text)
