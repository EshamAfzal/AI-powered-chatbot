from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route('/order/<order_id>', methods=['GET'])
def get_order(order_id):
    conn = sqlite3.connect('orders.db')
    c = conn.cursor()
    c.execute("SELECT * FROM orders WHERE order_id=?", (order_id,))
    row = c.fetchone()
    conn.close()
    if row:
        return jsonify({
            "order_id": row[0],
            "item": row[1],
            "price": row[2],
            "date": row[3],
            "status": row[4]
        })
    else:
        return jsonify({"error": "Order not found"}), 404

@app.route('/complain', methods=['POST'])
def save_complaint():
    data = request.get_json()
    email = data.get('email')
    complaint = data.get('complaint')

    conn = sqlite3.connect('orders.db')
    c = conn.cursor()
    c.execute("INSERT INTO complaints (email, complaint) VALUES (?, ?)", (email, complaint))
    conn.commit()
    conn.close()

    return jsonify({"message": "Complaint submitted successfully."})

if __name__ == '__main__':
    app.run(debug=True)
