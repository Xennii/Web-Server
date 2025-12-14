function showMessage() {
    const messageElement = document.getElementById('message');
    const messages = [
        "⚡ By the Emperor's will! 🔵",
        "🔴 Chaos corrupts all! Beware!",
        "💜 The Eldar's ancient wisdom flows...",
        "🟠 WAAAGH! FOR THE BOYZ!",
        "⚪ Necrons rise from their tombs...",
        "✡️ In the grim darkness, there is only war",
        "⚔️ For the Emperor and the Imperium!",
        "🌑 The Emperor protects",
        "✨ A single death means nothing to the machine",
        "⚡ The machine spirits awaken!",
        "💀 Victory or death in the name of the Imperium",
        "🔥 Burn the heretic, purge the unclean",
        "🏰 The Imperium shall endure for ten thousand more years",
        "⚔️ To be an Imperial citizen is to be blessed"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageElement.textContent = randomMessage;
    
    // Add animation
    messageElement.style.animation = 'none';
    setTimeout(() => {
        messageElement.style.animation = 'fadeInGrim 0.6s ease';
    }, 10);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({behavior: 'smooth'});
            }
        });
    });
});
