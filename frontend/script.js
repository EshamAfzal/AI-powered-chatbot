const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

function appendMessage(content, type) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(type === "bot" ? "bot-message" : "user-message");
    messageDiv.textContent = content;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage(message, "user");
    userInput.value = "";

    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        if (data.response) {
            appendMessage(data.response, "bot");
        } else {
            appendMessage("Sorry, I couldn't process your request.", "bot");
        }
    } catch (error) {
        appendMessage("Error connecting to server.", "bot");
    }
}
