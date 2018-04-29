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

	topics= dict( [("Academics", 1), ("Environmental Health and Safety", 2), ("Intercultural Affairs", 3), ("Events and Activities", 4), ("Student Activities", 5), ("Dining", 6), ("Community Outreach", 7), ("Fitness Center", 8), ("Research", 9), ("Campus Life", 10), ("Athletics", 11), ("Registrar", 12), ("Community Life", 13), ("First-Year Office", 14), ("Career Development", 15), ("Academic Affairs", 16), ("Spiritual Life", 17), ("Library", 18), ("Communications", 19), ("Finance", 20), ("NYUAD Services", 21), ("Residential Education", 22), ("Global Education", 23), ("Mentoring", 24), ("Admissions", 25), ("Around Abu Dhabi", 26), ("Grants", 27), ("Bookstore", 28), ("Facilities", 29), ("Health and Welness", 30), ("Housing", 31), ("Human Resources", 32), ("Mail", 33), ("Public Safety", 34), ("Technology", 35), ("Transportation", 36), ("Travel", 37), ("Operations", 38), ("Students Abroad", 39)])

	for k, v in topics.items():
		c.execute("INSERT INTO topics VALUES (:topic_id, :topic)", {"topic_id":v, "topic":k})

	conn.commit()
	conn.close()

	print("Database has been setup")
