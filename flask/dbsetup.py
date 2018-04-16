import sqlite3

conn = sqlite3.connect('posts.db')
c = conn.cursor()

c.execute("DROP TABLE IF EXISTS sample")
c.execute("DROP TABLE IF EXISTS posts")

c.execute("""CREATE TABLE posts (
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

conn.commit()
conn.close()

print("Database has been setup")
