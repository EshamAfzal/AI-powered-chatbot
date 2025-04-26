from flask import Flask, render_template, request, jsonify
import google.generativeai as genai  # Make sure you have this import

app = Flask(__name__, static_folder='../', template_folder='../')

# Configure Gemini AI
GEMINI_API_KEY = "AIzaSyCXj2QyaJvniYNSIPWHMxL1rZf0h-380Cw"  # (use a secret manager later for production)
genai.configure(api_key=GEMINI_API_KEY)

# Initialize the model
model = genai.GenerativeModel("gemini-1.5-pro")

@app.route('/')
def index():
    return render_template('index.html')  # Serve your HTML page

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        if not data or "message" not in data:
            return jsonify({"response": "Invalid input."}), 400

        user_input = data["message"]

        # First, handle basic keyword matching
        if "order" in user_input.lower():
            bot_reply = "Your order has been received and is being processed!"
        else:
            # If no special keyword, ask Gemini AI
            response = model.generate_content(user_input)

            if hasattr(response, "text"):
                bot_reply = response.text
            else:
                bot_reply = "No response from Gemini."

        return jsonify({"response": bot_reply})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"response": "Sorry, something went wrong."}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
