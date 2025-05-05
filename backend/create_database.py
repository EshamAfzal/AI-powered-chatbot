import sqlite3

conn = sqlite3.connect('orders.db')
c = conn.cursor()

# Create orders table
c.execute('''
CREATE TABLE IF NOT EXISTS orders (
    order_id TEXT PRIMARY KEY,
    item_name TEXT,
    price REAL,
    date TEXT,
    status TEXT
)
''')

# Insert dummy data
c.execute("INSERT OR IGNORE INTO orders VALUES ('ORD123', 'Headphones', 50.0, '2025-05-01', 'Delivered')")
c.execute("INSERT OR IGNORE INTO orders VALUES ('ORD124', 'Phone Case', 15.0, '2025-04-28', 'Shipped')")

# Create complaints table
c.execute('''
CREATE TABLE IF NOT EXISTS complaints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    complaint TEXT
)
''')

conn.commit()
conn.close()
