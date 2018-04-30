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
("interculturalaffairs", 2),
("eventsandactivities", 3),
("studentactivities", 4),
("dining", 5),
("communityoutreach", 6),
("fitnesscenter", 7),
("research", 8),
("campuslife", 9),
("athletics", 10),
("registrar", 11),
("communitylife", 12),
("careerdevelopment", 13),
("academicaffairs", 14),
("spirituallife", 15),
("library", 16),
("finance", 17),
("residentialeducation", 18),
("globaleducation", 19),
("facilities", 20),
("healthandwellness", 21),
("housing", 22),
("publicsafety", 23),
("transportation", 24),
("first-yearoffice", 25)])
	
	c.execute("SELECT COUNT(*) from topics")
	count=c.fetchone()
	# print(count[0])
	
	if not count[0]:
		for k, v in topics.items():
				c.execute("INSERT INTO topics VALUES (:topic_id, :topic)", {"topic_id":v, "topic":k})

	conn.commit()
	conn.close()

	print("Database has been setup")
