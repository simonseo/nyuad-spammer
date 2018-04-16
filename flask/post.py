class Post:
	def __init__(self,data):
		self.category_id=data[10]
		self.category_name=data[11]
		self.created_at=data[12]
		self.email=data[14]
		self.fullname=data[16]
		self.ID=data[17]
		self.message=data[20]
		self.publish_date=data[22]
		self.title=data[24]
		self.topic=data[25]
		self.updated=data[26]
		self.updated_at=data[27]
