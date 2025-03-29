document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");

    // Function to append messages to chatbox
    function appendMessage(sender, message, isError = false) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(sender === "bot" ? "bot-message" : "user-message");
        if (isError) messageDiv.style.color = "red"; // Error messages in red
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
    }

    // Function to send user message
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        appendMessage("user", message);
        userInput.value = "";

        try {
            const response = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            appendMessage("bot", data.response || "No response received");

        } catch (error) {
            appendMessage("bot", "⚠️ Error: Unable to connect to the server.", true);
            console.error("Fetch error:", error);
        }
    }

    // Listen for Enter key press
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // Expose function globally (for button click)
    window.sendMessage = sendMessage;
});
