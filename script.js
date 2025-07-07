document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('chat-messages');
    const input = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    // Load existing messages
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    storedMessages.forEach(message => addMessage(message));

    // Clean up old messages (older than 48 hours)
    const now = new Date().getTime();
    const cleanedMessages = storedMessages.filter(msg => {
        const timeDiff = (now - new Date(msg.timestamp).getTime()) / (1000 * 60 * 60 * 24);
        return timeDiff <= 2;
    });
    localStorage.setItem('chatMessages', JSON.stringify(cleanedMessages));

    function addMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sender}`;
        messageDiv.innerHTML = `
            <p>${message.text}</p>
            <div class="message-time">${new Date(message.timestamp).toLocaleTimeString()}</div>
        `;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        const message = {
            text: text,
            sender: 'tess',
            timestamp: new Date().toISOString()
        };

        // Add message to DOM
        addMessage(message);

        // Save to localStorage
        const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        messages.push(message);
        localStorage.setItem('chatMessages', JSON.stringify(messages));

        // Clear input
        input.value = '';
    }

    // Handle send button click
    sendButton.addEventListener('click', sendMessage);

    // Handle Enter key press
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
