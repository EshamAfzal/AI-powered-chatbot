import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Set your Gemini API Key
GEN_API_KEY = "AIzaSyCXj2QyaJvniYNSIPWHMxL1rZf0h-380Cw"  # Your valid Gemini API key
genai.configure(api_key=GEN_API_KEY)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

@app.route("/chat", methods=["POST"])
def chat():
    try:
        # Get user input from the request
        data = request.get_json()
        user_input = data.get("message", "")
        
        # Basic validation
        if not user_input:
            return jsonify({"response": "Please provide a valid message."}), 400
        
        # Use a simple test model
        model_name = "gemini"  # Try using a simple model

        # Test the model for a response
        model = genai.GenerativeModel(model_name)
        
        # Check if the model can generate content
        if hasattr(model, 'generate_content'):
            response_gemini = model.generate_content(user_input)  # Use dynamic user input
            gemini_response = response_gemini.text
            logging.debug(f"Gemini response: {gemini_response}")  # Log Gemini response for debugging
        else:
            raise Exception(f"The model {model_name} does not support generate_content method.")
        
        # Return the response
        return jsonify({"gemini_response": gemini_response})

    except Exception as e:
        logging.error(f"Error: {str(e)}")  # Log the error in the backend
        return jsonify({"response": f"Sorry, I encountered an error while processing your request: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
