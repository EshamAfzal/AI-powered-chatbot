from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Configure Gemini AI once at the start
GEMINI_API_KEY = "AIzaSyCXj2QyaJvniYNSIPWHMxL1rZf0h-380Cw"
genai.configure(api_key=GEMINI_API_KEY)

# Initialize the model once to avoid creating it on every request
model = genai.GenerativeModel("gemini-1.5-pro")

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        if not data or "message" not in data:
            return jsonify({"response": "Invalid input."}), 400

        user_input = data["message"]
        response = model.generate_content(user_input)

        # Check if response and text exist
        if hasattr(response, "text"):
            return jsonify({"response": response.text})
        else:
            return jsonify({"response": "No response from Gemini."}), 500

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"response": "Sorry, something went wrong."}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
