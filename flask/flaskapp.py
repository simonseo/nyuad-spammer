from flask import Flask, request, Response, redirect, url_for, send_from_directory
from post import Post
from secret import HOSTADDRESS
from werkzeug import secure_filename
from readCSV import ReadCSV
import databaseOperations as db
import sqlite3
import os
import json
import csv

UPLOAD_FOLDER = 'uploads'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/printall")
def printall():
	return db.printall()

# @app.route("/addpost/<int:IDToAdd>/<postToAdd>")
# def addpost(IDToAdd,postToAdd):
# 	return db.addpost(IDToAdd,postToAdd)

@app.route("/getpost/<int:getID>")
def getpost(getID):
	return db.getpost(getID)

@app.route("/rmpost/<int:rmID>")
def removepost(rmID):
	return db.removepost(rmID)

@app.route("/", methods=['GET','POST'])
def getCSV():
	# http://flask.pocoo.org/docs/patterns/fileuploads/
	if request.method == 'POST':
		if 'file' not in request.files:
			return "No file part"
		file = request.files['file']
		if file.filename == '':
			return "No selected file"
		if file and (file.filename[-3:].lower() == 'csv'):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			db.injectData(ReadCSV(filename))
			return "upload successful"

	return '''
	<!doctype html>
	<title>Upload new File</title>
	<h1>Upload new File</h1>
	<form method=post enctype=multipart/form-data>
	  <p><input type=file name=file>
		 <input type=submit value=Upload>
	</form>
	'''

@app.route("/postJson", methods=['POST'])
def postJson():
	print('Recieved from client: {}'.format(request.data)) # JSON byte-String
	print(json.loads(request.data)) # JSON String
	print(type(json.loads(request.data))) # python dict

	# Save JSON data as CSV here...
	# Maybe with json2csv module...
	json_parsed = json.loads(request.data)

	# will change variable names later
	new_data = open('/new.csv', 'w')
	csvwriter = csv.writer(request.data)
	count = 0
	for req in request.data:
		if count == 0:
			header = req.keys()
			csvwriter.writerow(header)
			count +=1
		csvwriter.writerow(req.values())
	request.data.close()

	db.injectData(ReadCSV(filename))
	return Response('We recieved something…')

if __name__ == "__main__":
	app.run()#host=HOSTADDRESS, port=80)
