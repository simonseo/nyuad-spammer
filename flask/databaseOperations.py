import sqlite3

def drop():
	conn = sqlite3.connect('sample.db')
	c = conn.cursor()
	c.execute("DROP TABLE sample")
	conn.commit()
	conn.close()
	return "Table has been dropped"

def addpost(addID,addPost):
	postToAdd=Post(addID,addPost)
	with conn:
		c.execute("INSERT INTO sample VALUES (:ID, :content)", {'ID': postToAdd.ID, 'content': postToAdd.content})
	return "post added"

def getpost(getID):
	c.execute("SELECT content FROM sample WHERE ID=:ID", {'ID': getID})
	x=c.fetchall()[0][0]
	return x

def remove_post(rmID):
	with conn:
		c.execute("DELETE from sample WHERE ID = :ID",
				{'ID': rmID})
