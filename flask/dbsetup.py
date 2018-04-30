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
		userID text not null
	)""")

	c.execute("""CREATE TABLE IF NOT EXISTS userSubscriptions (
		category_id text not null,
		userID text not null
	)""")

	c.execute("""CREATE TABLE IF NOT EXISTS categories (
		category_id text not null,
		category_name text not null
	)""")

	categories= dict([("Events & Activities", 1),("News & Information", 5),("Learning & Development", 2),("Service Notifications", 4),("Job Opportunities, Internships & Volunteering", 7),("Deadlines", 3),("Discounts, Deals & Promotions", 6),("Policies", 9)])

	for k, v in categories.items():
		c.execute("INSERT INTO categories VALUES (:category_id, :category_name)", {"category_id":v, "category_name":k})

	conn.commit()
	conn.close()

	print("Database has been setup")
