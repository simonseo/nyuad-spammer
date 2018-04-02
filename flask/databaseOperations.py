import sqlite3
from post import Post

# def drop():
# 	conn = sqlite3.connect('posts.db')
# 	c = conn.cursor()
# 	c.execute("DROP TABLE posts")
# 	conn.commit()
# 	conn.close()
# 	return "Table has been dropped"

def addpost(addPost):
	postToAdd=Post(addPost)
	conn = sqlite3.connect('posts.db')
	c = conn.cursor()
	with conn:
		c.execute("INSERT INTO posts VALUES (:ID, :content)", { 'content': postToAdd.content})
	conn.commit()
	conn.close()
	return "post added"

def getpost(getID):
	conn = sqlite3.connect('posts.db')
	c = conn.cursor()
	c.execute("SELECT content FROM posts WHERE ID=:ID", {'ID': getID})
	x=c.fetchall()[0][0]
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
