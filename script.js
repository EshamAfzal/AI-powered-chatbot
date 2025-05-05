const chatbox = document.querySelector('#chat-box');
const input = document.querySelector('#user-input');
const sendBtn = document.querySelector('#send-btn');
let context = null;

// Append message
function appendMessage(message, className = 'bot-message') {
    const msg = document.createElement('div');
    msg.className = className;
    msg.textContent = message;
    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Typing indicator
function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    chatbox.appendChild(typing);
    chatbox.scrollTop = chatbox.scrollHeight;
}
function hideTyping() {
    const typing = document.querySelector('.typing-indicator');
    if (typing) typing.remove();
}

// Handle user input
function handleInput(userMessage) {
    const msg = userMessage.toLowerCase();

    if (context === 'track' || context === 'refund') {
        showTyping();
        fetch(`http://127.0.0.1:5000/order/${userMessage}`)
            .then(res => res.json())
            .then(data => {
                hideTyping();
                if (data.error) {
                    appendMessage("❌ Order not found. Please check the Order ID.");
                } else {
                    appendMessage(`📦 Order ID: ${data.order_id}\n🛍️ Item: ${data.item}\n💰 Price: $${data.price}\n📅 Date: ${data.date}\n🚚 Status: ${data.status}`);
                    if (context === 'refund') {
                        appendMessage("✅ Refund process started. Please share your bank details.");
                    }
                }
                context = null;
            }).catch(() => {
                hideTyping();
                appendMessage("⚠️ Failed to reach server. Please try again later.");
                context = null;
            });
        return;
    }

    if (context === 'complain') {
        const [email, complaint] = userMessage.split('|');
        if (!email || !complaint) {
            appendMessage("Please enter in format: your@email.com | Your complaint...");
            return;
        }
        showTyping();
        fetch('http://127.0.0.1:5000/complain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.trim(), complaint: complaint.trim() })
        }).then(() => {
            hideTyping();
            appendMessage("📝 Your complaint has been recorded. Our team will reach out shortly.");
            context = null;
        }).catch(() => {
            hideTyping();
            appendMessage("⚠️ Could not send complaint. Try again later.");
        });
        return;
    }

    // Default context
    if (msg.includes("track")) {
        appendMessage("🔍 Please enter your Order ID to track.");
        context = 'track';
    } else if (msg.includes("order status")) {
        appendMessage("📦 Enter your Order ID to check the status.");
        context = 'track';
    } else if (msg.includes("refund") || msg.includes("exchange")) {
        appendMessage("🔁 Please provide your Order ID for refund or exchange.");
        context = 'refund';
    } else if (msg.includes("complain")) {
        appendMessage("📝 Please enter your email and complaint in this format:\nemail@example.com | My item arrived damaged.");
        context = 'complain';
    } else {
        showTyping();
        setTimeout(() => {
            hideTyping();
            appendMessage("🤖 Let me check that for you...");
        }, 1500);
    }
}

// Event listeners
sendBtn.addEventListener('click', () => {
    const message = input.value.trim();
    if (message) {
        appendMessage(message, 'user-message');
        handleInput(message);
        input.value = '';
    }
});

// Suggested button handler
function selectQuestion(text) {
    appendMessage(text, 'user-message');
    handleInput(text);
}

// Chat toggle
function toggleChatbot() {
    const chatbotContainer = document.getElementById('chatbot-container');
    chatbotContainer.style.display = chatbotContainer.style.display === 'none' ? 'flex' : 'none';
}
