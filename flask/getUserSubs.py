import csv
import requests, json
import sqlite3
import databaseOperations as db
import time
from datetime import datetime as dt
from flask import jsonify


def getUserSubs(userID):
	conn = sqlite3.connect('posts.db')
	c = conn.cursor()
	to_send={"posts":[]}
	with conn:
		c.execute("SELECT topic_id from userSubscriptions where userID=?",(userID,))
		subscribed_topics=c.fetchall()
		# print(subscribed_topics)
		topics_list=[]
		for topic in subscribed_topics:
			topics_list.append(topic[0])
		if topics_list:
			# print("SELECT topic from topics where topic_id in ({})".format(','.join('?'*len(topics_list))))
			c.execute("SELECT topic from topics where topic_id in ({})"
				.format(','.join('?'*len(topics_list))),(topics_list))
			subscribed_topics=c.fetchall()
			topics_list=[]
			for topic in subscribed_topics:
				topics_list.append(topic[0])
			print("User subscribed to:\n"+str(userID)+"\n"+str(topics_list))
			c.execute("SELECT ID,title,message,updated_at from posts where topic in ({})"
				.format(','.join('?'*len(topics_list))),(topics_list))
			posts_selected=c.fetchall()
			c.execute("SELECT last_updated from users where userID=?",(userID,))
			last_updated=c.fetchone()[0] #when the user was last updated
			for post in posts_selected:
				savedTime=dt.strptime(post[3], "%Y-%m-%d %H:%M:%S") #this is the updated_at attribute
				unixtime = time.mktime(savedTime.timetuple())
				# print("Unix time:",unixtime,", last updated:",last_updated)
				if unixtime>last_updated:
					to_send["posts"].append(post[1]+post[2])
			c.execute("UPDATE users SET last_updated=? WHERE userID=?", (int(time.time()), userID))


	#UPDATE LAST UPDATED FOR THIS USER
	conn.commit()
	conn.close()
	return jsonify(to_send)
