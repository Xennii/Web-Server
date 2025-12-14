function showMessage() {
    const messageElement = document.getElementById('message');
    const messages = [
        "Hello! You clicked the button! 👋",
        "Great job! You're interactive! 🎉",
        "Keep clicking for more surprises! ⭐",
        "You're awesome! 🚀"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageElement.textContent = randomMessage;
    
    // Add animation
    messageElement.style.animation = 'none';
    setTimeout(() => {
        messageElement.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
