document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");

    // Function to send messages
    window.sendMessage = function (message) {
        if (!message) message = userInput.value.trim();
        if (message === "") return;

        // Display user message
        displayMessage(message, "user-message");

        // Get chatbot response
        setTimeout(() => {
            getBotResponse(message);
        }, 1000);

        // Clear input field
        userInput.value = "";
    };

    // Function to display messages
    function displayMessage(text, className) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(className);
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    }

    // Function to get chatbot response
    function getBotResponse(userMessage) {
        let response = "";

        switch (userMessage.toLowerCase()) {
            case "order status":
                response = "Please provide your order number to check the status.";
                break;
            case "return or refund":
                response = `
                    <b>Return & Refund Policy:</b><br>
                    1️⃣ Order Number <br>
                    2️⃣ Product Issue <br>
                    3️⃣ Reason for Return/Refund
                `;
                break;
            case "cancel order":
                response = "To cancel your order, please provide the order number.";
                break;
            case "something else":
                response = "Please describe your issue, and we’ll assist you further.";
                break;
            default:
                response = "I'm sorry, I didn't understand that. Can you rephrase?";
        }

        displayMessage(response, "bot-message");
    }
});
