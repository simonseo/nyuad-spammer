import sqlite3
from post import Post
from datetime import datetime as dt
import time
from sendPost import SendPost
def addpost(data):
	postToAdd=Post(data)
	conn = sqlite3.connect('posts.db')
	c = conn.cursor()

	with conn:
		c.execute("SELECT updated,updated_at FROM posts WHERE ID=:ID", {'ID': postToAdd.ID})
	x=c.fetchone()

	if x:
		if postToAdd.updated=='1':
			savedTime=dt.strptime(x[1], "%Y-%m-%d %H:%M:%S")
			toAddTime=dt.strptime(postToAdd.updated_at, "%Y-%m-%d %H:%M:%S")
			if toAddTime > savedTime:
				print("Time replaced for post ID "+ postToAdd.ID)
				with conn:
					c.execute("UPDATE posts SET message=?, updated_at=? WHERE ID=?", (postToAdd.message, postToAdd.updated_at, postToAdd.ID))

	else:
		with conn:
			c.execute("INSERT INTO posts VALUES (:category_id, :category_name, :created_at, :email, :fullname, :ID, :message, :publish_date, :title, :topic, :updated, :updated_at)", {"category_id":postToAdd.category_id, "category_name":postToAdd.category_name, "created_at":postToAdd.created_at, "email":postToAdd.email, "fullname":postToAdd.fullname, "ID":postToAdd.ID, "message":postToAdd.message, "publish_date":postToAdd.publish_date, "title":postToAdd.title, "topic":postToAdd.topic, "updated":postToAdd.updated, "updated_at":postToAdd.updated_at})

	conn.commit()
	conn.close()
	return "post added"

def getpost(getID):
	conn = sqlite3.connect('posts.db')
	c = conn.cursor()
	with conn:
		c.execute("SELECT message FROM posts WHERE ID=:ID", {'ID': getID})
	x=c.fetchall()[0]
	conn.commit()
	conn.close()
	return x

def removepost(rmID):
	conn = sqlite3.connect('posts.db')
	c = conn.cursor()
	with conn:
		c.execute("DELETE from posts WHERE ID = :ID",
				{'ID': rmID})
	conn.commit()
	conn.close()
	return "Removed post"

def printall():
	conn = sqlite3.connect('posts.db')
	c = conn.cursor()
	with conn:
		c.execute("SELECT message FROM posts")
	x=c.fetchall()
	for post in x:
		print(post)
	conn.commit()
	conn.close()
	return "All printed in terminal"

def injectData(data):
	# Assume first row of data is header
	print("This should be the header: ", data.pop(0)) # remove header
	for row in data:
		addpost(row)
	return "All data inserted"

def addUser(IDToAdd):
	conn = sqlite3.connect('posts.db')
	c = conn.cursor()
	with conn:
			c.execute("INSERT OR IGNORE INTO users VALUES (?,?)",(IDToAdd, int(time.time())))
	conn.commit()
	conn.close()
	return "user added"

def addSub(userID, categoryNames):
	conn = sqlite3.connect('posts.db')
	c = conn.cursor()
	categories=categoryNames.split(',')
	for category in categories:
		with conn:
			c.execute("SELECT topic_id FROM topics WHERE topic = ?",(category,))
			topic_id_found=c.fetchone()
			# print(topic_id_found[0])
			if topic_id_found:
				# print("Found the topic "+category)
				c.execute("SELECT * FROM userSubscriptions WHERE userID = ? AND topic_id = ? ",(userID,topic_id_found[0]))
				result_exists=c.fetchone()
				# print("Result: "+str(result_exists))
				if not result_exists:
					c.execute("INSERT INTO userSubscriptions VALUES (?,?)",(topic_id_found[0],userID))
					print("New subscription")
	return "user subscribed"

def addSubAll(userID):
	userID=str(userID)
	conn = sqlite3.connect('posts.db')
	c = conn.cursor()
	with conn:
		c.execute("SELECT topic FROM topics")
	x=c.fetchall()
	topicList=""
	for topic in x:
		topicList+=topic[0]
		topicList+=","
	# print(topicList)
	addSub(userID,topicList)
	return "user subscribed to all"

def unSub(userID, categoryNames):
	conn = sqlite3.connect('posts.db')
	c = conn.cursor()
	categories=categoryNames.split(',')
	for category in categories:
		with conn:
			c.execute("SELECT topic_id FROM topics WHERE topic = ?",(category,))
		topic_id_found=c.fetchone()
		print(topic_id_found)
		if topic_id_found:
			print("Found the topic "+category)
			with conn:
				c.execute("DELETE from userSubscriptions WHERE topic_id = ? AND userID = ?",(topic_id_found[0], userID))
			result=c.fetchone
			if result:
				print("Unsubscibed "+str(userID)+" from "+category)
	return "user unsubscribed"

def unSubAll(userID):
	userID=str(userID)
	conn = sqlite3.connect('posts.db')
	c = conn.cursor()
	with conn:
		c.execute("SELECT topic FROM topics")
	x=c.fetchall()
	topicList=""
	for topic in x:
		topicList+=topic[0]
		topicList+=","
	# print(topicList)
	unSub(userID,topicList)
	return "user unsubscribed from all"
