from flask import Flask, request, jsonify
import sqlite3
import re

app = Flask(__name__)

# Helper function to fetch order details
def fetch_order_details(order_id):
    conn = sqlite3.connect('orders.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM orders WHERE order_id=?", (order_id,))
    order = cursor.fetchone()
    conn.close()
    return order

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '').lower().strip()

    # Friendly responses for greetings
    greetings = ['hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon']

    if any(greet in user_message for greet in greetings):
        response = "👋 Hey there! How can I assist you today?"

    # Order tracking logic
    elif 'order' in user_message or 'track' in user_message:
        match = re.search(r'\b\d{3,}\b', user_message)  # search for 3+ digit numbers
        if match:
            order_id = match.group()
            order = fetch_order_details(order_id)
            if order:
                order_id, email, details, price, phone, status = order
                response = (f"📦 *Order ID*: {order_id}\n"
                            f"✉️ *Email*: {email}\n"
                            f"📝 *Details*: {details}\n"
                            f"💵 *Price*: {price}\n"
                            f"📱 *Phone*: {phone}\n"
                            f"🚚 *Status*: {status}")
            else:
                response = "❗Sorry, I couldn't find an order with that ID. Could you please double-check it?"
        else:
            response = "❓Could you please provide your Order ID so I can assist you with tracking?"

    # If message not recognized
    else:
        response = "🤔 I'm here to help! Could you please provide more details about your query?"

    return jsonify({'reply': response})

if __name__ == '__main__':
    app.run(debug=True)
