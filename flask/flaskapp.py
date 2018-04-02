from flask import Flask
from post import Post
import sqlite3 
from secret import HOSTADDRESS
import databaseOperations as db

app = Flask(__name__)

@app.route("/drop")
def drop():
	return db.drop()

@app.route("/addpost/<postToAdd>")
def addpost(postToAdd):
	return db.addpost(postToAdd)


@app.route("/getpost/<int:getID>")
def getpost(getID):
	return db.getpost(getID)

@app.route("/rmpost/<int:rmID>")
def removepost(rmID):
	return db.removepost(rmID)

if __name__ == "__main__":
	app.run()#host=HOSTADDRESS, port=80)
