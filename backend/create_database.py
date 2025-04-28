import sqlite3

# Connect to SQLite database (it will create 'orders.db' if it doesn't exist)
conn = sqlite3.connect('orders.db')
cursor = conn.cursor()

# Create 'orders' table
cursor.execute('''
CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY,
    email TEXT,
    phone TEXT,
    product TEXT,
    price REAL,
    status TEXT
)
''')

# Insert sample dummy orders
orders = [
    (12345, 'john@example.com', '123-456-7890', 'Wireless Headphones', 59.99, 'Shipped'),
    (67890, 'alice@example.com', '987-654-3210', 'Bluetooth Speaker', 29.99, 'Delivered'),
    (11223, 'bob@example.com', '555-123-4567', 'Smart Watch', 99.99, 'Processing')
]

cursor.executemany('INSERT INTO orders VALUES (?, ?, ?, ?, ?, ?)', orders)

# Commit and close
conn.commit()
conn.close()

print("Database created and dummy orders inserted successfully.")
