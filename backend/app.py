from flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_folder='../', template_folder='../')

@app.route('/')
def index():
    return render_template('index.html')  # Serve index.html directly

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')

    # For now, using a simple logic to generate a reply
    bot_reply = generate_reply(user_message)

    return jsonify({'reply': bot_reply})

def generate_reply(message):
    if "order" in message.lower():
        return f"Your order has been received and is being processed!"
    else:
        return "How can I assist you with your order?"
