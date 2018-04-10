from flask import Flask
from post import Post
import sqlite3 
from secret import HOSTADDRESS

conn = sqlite3.connect('sample.db')
c = conn.cursor()

app = Flask(__name__)

@app.route("/setup")
def setup():
	conn = sqlite3.connect('sample.db')
	c = conn.cursor()
	c.execute("""CREATE TABLE sample (
		ID int, 
		content text
		)""")
	conn.commit()
	conn.close()
	return "Server has been setup"

@app.route("/drop")
def drop():
	conn = sqlite3.connect('sample.db')
	c = conn.cursor()
	c.execute("DROP TABLE sample")
	conn.commit()
	conn.close()
	return "Table has been dropped"

@app.route("/addpost/<int:addID>/<addPost>")
def addpost(addID,addPost):
	postToAdd=Post(addID,addPost)
	with conn:
		c.execute("INSERT INTO sample VALUES (:ID, :content)", {'ID': postToAdd.ID, 'content': postToAdd.content})
	return "post added"


@app.route("/getpost/<int:getID>")
def getpost(getID):
	c.execute("SELECT content FROM sample WHERE ID=:ID", {'ID': getID})
	x=c.fetchall()[0][0]
	return x

@app.route("/rmpost/<int:rmID>")
def remove_post(rmID):
	with conn:
		c.execute("DELETE from sample WHERE ID = :ID",
				  {'ID': rmID})


if __name__ == "__main__":
	app.run(host=HOSTADDRESS, port=80)
