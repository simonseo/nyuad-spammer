import sqlite3


def DBsetup():
	conn = sqlite3.connect('posts.db')
	c = conn.cursor()

	c.execute("""CREATE TABLE IF NOT EXISTS posts (
		category_id text not null,
		category_name text not null,
		created_at text not null,
		email text not null,
		fullname text not null,
		ID text primary key,
		message text not null,
		publish_date text not null,
		title text not null,
		topic text not null,
		updated text not null,
		updated_at text not null
	)""")

	c.execute("""CREATE TABLE IF NOT EXISTS users (
		userID text not null unique,
		last_updated integer not null
	)""")

	c.execute("""CREATE TABLE IF NOT EXISTS userSubscriptions (
		topic_id text not null,
		userID text not null
	)""")

	c.execute("""CREATE TABLE IF NOT EXISTS topics (
		topic_id text not null,
		topic text not null
	)""")

	topics= dict([("academics", 1),
("academicaffairs", 2),
("academicresourcecenter", 3),
("globaleducation", 4),
("library", 5),
("mentoring", 6),
("registrar", 7),
("admissions", 8),
("campuslife", 9),
("athletics", 10),
("careerdevelopment", 11),
("communityoutreach", 12),
("first-yearoffice", 13),
("fitnesscenter", 14),
("interculturalaffairs", 15),
("residentialeducation", 16),
("spirituallife", 17),
("studentactivities", 18),
("aroundabudhabi", 19),
("eventsandactivities", 20),
("grants", 21),
("nyuadservices", 22),
("bookstore", 23),
("communications", 24),
("communitylife", 25),
("environmentalhealthandsafety", 26),
("dining", 27),
("facilities", 28),
("finance", 29),
("healthandwellness", 30),
("housing", 31),
("humanresources", 32),
("mail", 33),
("publicsafety", 34),
("technology", 35),
("transportation", 36),
("travel", 37),
("operations", 38),
("research", 39),
("studentsabroad", 40)])
	
	c.execute("SELECT COUNT(*) from topics")
	count=c.fetchone()
	# print(count[0])
	
	if not count[0]:
		for k, v in topics.items():
				c.execute("INSERT INTO topics VALUES (:topic_id, :topic)", {"topic_id":v, "topic":k})

	conn.commit()
	conn.close()

	print("Database has been setup")


if __name__ == "__main__":
	DBsetup()
