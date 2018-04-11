import sqlite3

conn = sqlite3.connect('posts.db')
c = conn.cursor()

c.execute("DROP TABLE IF EXISTS sample")
c.execute("DROP TABLE IF EXISTS posts")

c.execute("""CREATE TABLE posts (
	alert text not null,
	alert_end text not null,
	alert_end_date text not null,
	alert_end_time text not null,
	alert_start text not null,
	alert_start_date text not null,
	alert_start_time text not null,
	audience_0 text not null,
	audience_1 text not null,
	audience_2 text not null,
	category_id text not null,
	category_name text not null,
	created_at text not null,
	editable text not null,
	email text not null,
	expiration_date text not null,
	fullname text not null,
	ID text primary key,
	location_0 text not null,
	location_1 text not null,
	message text not null,
	owner text not null,
	publish_date text not null,
	republished_at text not null,
	title text not null,
	topic text not null,
	updated text not null,
	updated_at text not null
)""")

conn.commit()
conn.close()

print("Database has been setup")