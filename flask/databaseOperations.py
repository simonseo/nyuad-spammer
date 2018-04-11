import sqlite3
from post import Post

def addpost(data):
	postToAdd=Post(data)
	conn = sqlite3.connect('posts.db')
	c = conn.cursor()
	with conn:
		c.execute("INSERT INTO posts VALUES (:alert,:alert_end,:alert_end_date,:alert_end_time,:alert_start,:alert_start_date,:alert_start_time,:audience_0,:audience_1,:audience_2,:category_id,:category_name,:created_at,:editable,:email,:expiration_date,:fullname,:ID,:location_0,:location_1,:message,:owner,:publish_date,:republished_at,:title,:topic,:updated,:updated_at)", {"alert":postToAdd.alert, "alert_end":postToAdd.alert_end, "alert_end_date":postToAdd.alert_end_date, "alert_end_time":postToAdd.alert_end_time, "alert_start":postToAdd.alert_start, "alert_start_date":postToAdd.alert_start_date, "alert_start_time":postToAdd.alert_start_time, "audience_0":postToAdd.audience_0, "audience_1":postToAdd.audience_1, "audience_2":postToAdd.audience_2, "category_id":postToAdd.category_id, "category_name":postToAdd.category_name, "created_at":postToAdd.created_at, "editable":postToAdd.editable, "email":postToAdd.email, "expiration_date":postToAdd.expiration_date, "fullname":postToAdd.fullname, "ID":postToAdd.ID, "location_0":postToAdd.location_0, "location_1":postToAdd.location_1, "message":postToAdd.message, "owner":postToAdd.owner, "publish_date":postToAdd.publish_date, "republished_at":postToAdd.republished_at, "title":postToAdd.title, "topic":postToAdd.topic, "updated":postToAdd.updated, "updated_at":postToAdd.updated_at})
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
	for row in data:
		addpost(row)
	return "All data inserted"

