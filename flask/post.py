import json

class Post:
	def __init__(self,data):
		self.ID=data[0]
		self.title=data[1]
		self.message=data[2]
		self.topic=data[3]
		self.category_id=data[5]
		self.publish_date=data[7]
		self.fullname=data[10]
		self.email=data[11]
		self.updated=data[15]
		self.updated_at=data[17]
		self.created_at=data[18]
		# print(data[24])
		# print(json.loads(data[24]))
		# print(json.loads(data[24])['name'])
		self.category_name=json.loads(data[24].replace("'", '"'))['name'] #change to double quote
