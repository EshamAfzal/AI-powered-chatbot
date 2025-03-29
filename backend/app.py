from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Set your Gemini API Key
GEMINI_API_KEY = "AIzaSyCXj2QyaJvniYNSIPWHMxL1rZf0h-380Cw"
genai.configure(api_key=GEMINI_API_KEY)

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_input = data.get("message", "")

        # Use the correct model name (run list_models to check)
        model = genai.GenerativeModel("gemini-1.5-pro")  
        response = model.generate_content(user_input)

        return jsonify({"response": response.text})
    
    except Exception as e:
        print("Error:", e)
        return jsonify({"response": "Sorry, something went wrong."}), 500

if __name__ == "__main__":
    app.run(debug=True)
