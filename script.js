// Toggle chatbot open and close
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

        // Simulate bot response
        setTimeout(() => {
            const botMessage = document.createElement("div");
            botMessage.className = "bot-message";
            botMessage.textContent = "Thank you for reaching out! We'll get back to you soon.";
            chatBox.appendChild(botMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);
    }
}
