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

	conn.commit()
	conn.close()

	print("Database has been setup")
