import csv
import html2text

data=[]

def htmlToText(content):
	return html2text.html2text(content)

def ReadCSV(file):
	with open(file, newline='') as csvfile:
		spamreader = csv.reader(csvfile, delimiter=',')
		for row in spamreader:
			data.append(row)
		return data
