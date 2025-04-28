// Toggle chatbot window
function toggleChatbot() {
    const chatbotContainer = document.getElementById('chatbot-container');
    if (chatbotContainer.style.display === "flex") {
        chatbotContainer.style.display = "none";
    } else {
        chatbotContainer.style.display = "flex";
    }
}

// Send a message
function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const message = userInput.value.trim();

    if (message !== "") {
        // Add user message
        const userMessage = document.createElement("div");
        userMessage.className = "user-message";
        userMessage.textContent = message;
        chatBox.appendChild(userMessage);

        // Scroll to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;

        // Clear input
        userInput.value = "";

        // Send message to the backend
        fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            const botMessage = document.createElement("div");
            botMessage.className = "bot-message";
            botMessage.textContent = data.gemini_response || "Sorry, I couldn't get a response.";
            chatBox.appendChild(botMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch((error) => {
            console.error('Error:', error);
            const botMessage = document.createElement("div");
            botMessage.className = "bot-message";
            botMessage.textContent = "Oops! Something went wrong. Please try again.";
            chatBox.appendChild(botMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        });
    }
}

// Listen for "Enter" key press
document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.getElementById("user-input");
    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
});

// 📌 NEW: Bubble Question Click Handler
function selectQuestion(text) {
    document.getElementById("user-input").value = text;
    sendMessage();
}
