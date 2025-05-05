const chatbox = document.querySelector('.chatbox');
const input = document.querySelector('#user-input');
const sendBtn = document.querySelector('#send-btn');
const buttons = document.querySelectorAll('.suggested-btn');

let context = null; // Track what the user is doing (e.g., tracking, refund, complain)

// Append message to chat window
function appendMessage(message, className = 'bot-message') {
    const msg = document.createElement('div');
    msg.className = className;
    msg.textContent = message;
    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Respond based on user input and current context
function handleInput(userMessage) {
    const msg = userMessage.toLowerCase();

    if (context === 'track' || context === 'refund') {
        fetch(`http://127.0.0.1:5000/order/${userMessage}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    appendMessage("❌ Order not found. Please check the Order ID.");
                } else {
                    appendMessage(`📦 Order ID: ${data.order_id}\n🛍️ Item: ${data.item}\n💰 Price: $${data.price}\n📅 Date: ${data.date}\n🚚 Status: ${data.status}`);
                    if (context === 'refund') {
                        appendMessage("✅ Refund process started. Please share your bank details.");
                    }
                }
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
        fetch('http://127.0.0.1:5000/complain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.trim(), complaint: complaint.trim() })
        }).then(() => {
            appendMessage("📝 Your complaint has been recorded. Our team will reach out shortly.");
            context = null;
        });
        return;
    }

    // No context: Check for button or user-typed commands
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
        appendMessage("🤖 Let me check that for you...");
    }
}

// Send message on button click
sendBtn.addEventListener('click', () => {
    const message = input.value.trim();
    if (message) {
        appendMessage(message, 'user-message');
        handleInput(message);
        input.value = '';
    }
});

// Handle suggested buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const text = button.textContent;
        appendMessage(text, 'user-message');
        handleInput(text);
    });
});
