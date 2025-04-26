import sqlite3

# Connect to (or create) the database
conn = sqlite3.connect('orders.db')

# Create a cursor object
cursor = conn.cursor()

# Create a table for orders
cursor.execute('''
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id TEXT NOT NULL,
        email TEXT NOT NULL,
        phone_number TEXT,
        order_details TEXT,
        price REAL,
        order_status TEXT
    )
''')

# Commit and close the connection
conn.commit()
conn.close()

print("Database and table created successfully!")
