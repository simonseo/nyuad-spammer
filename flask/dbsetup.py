import sqlite3

conn = sqlite3.connect('posts.db')
c = conn.cursor()

c.execute("DROP TABLE IF EXISTS sample")

c.execute("""CREATE TABLE posts (
	ID integer primary key,
	content text not null
)""")

conn.commit()
conn.close()

print("Database has been setup")