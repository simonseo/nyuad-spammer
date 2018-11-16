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
("academic affairs", 2),
("academic resource center", 3),
("global education", 4),
("library", 5),
("mentoring", 6),
("registrar", 7),
("admissions", 8),
("campus life", 9),
("athletics", 10),
("career development", 11),
("community outreach", 12),
("first-year office", 13),
("fitness center", 14),
("intercultural affairs", 15),
("residential education", 16),
("spiritual life", 17),
("student activities", 18),
("around abu dhabi", 19),
("events and activities", 20),
("grants", 21),
("nyuad services", 22),
("bookstore", 23),
("communications", 24),
("community life", 25),
("environmental health and safety", 26),
("dining", 27),
("facilities", 28),
("finance", 29),
("health and wellness", 30),
("housing", 31),
("human resources", 32),
("mail", 33),
("public safety", 34),
("technology", 35),
("transportation", 36),
("travel", 37),
("operations", 38),
("research", 39),
("students abroad", 40),])
	
	c.execute("SELECT COUNT(*) from topics")
	count=c.fetchone()
	# print(count[0])
	
	if not count[0]:
		for k, v in topics.items():
				c.execute("INSERT INTO topics VALUES (:topic_id, :topic)", {"topic_id":v, "topic":k})

	conn.commit()
	conn.close()

	print("Database has been setup")
