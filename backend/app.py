import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Set your Gemini API Key
GEN_API_KEY = "AIzaSyCXj2QyaJvniYNSIPWHMxL1rZf0h-380Cw"
genai.configure(api_key=GEN_API_KEY)

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_input = data.get("message", "")

        # Gemini AI model call
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(user_input)

        return jsonify({"response": response.text})
    
    except Exception as e:
        return jsonify({"response": "Error: " + str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
