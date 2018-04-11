import csv
data=[]
def ReadCSV(file):
	with open(file, newline='') as csvfile:
		spamreader = csv.reader(csvfile, delimiter=',')
		for row in spamreader:
			data.append(row)
		return data
