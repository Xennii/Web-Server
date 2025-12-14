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

// Gallery Navigation
let currentGalleryIndex = 0;

function changeGallery(direction) {
    const images = document.querySelectorAll('.hero-image');
    const indicators = document.querySelectorAll('.indicator');
    
    images[currentGalleryIndex].classList.remove('active');
    indicators[currentGalleryIndex].classList.remove('active');
    
    currentGalleryIndex += direction;
    if (currentGalleryIndex >= images.length) {
        currentGalleryIndex = 0;
    } else if (currentGalleryIndex < 0) {
        currentGalleryIndex = images.length - 1;
    }
    
    images[currentGalleryIndex].classList.add('active');
    indicators[currentGalleryIndex].classList.add('active');
}

function goToGallery(index) {
    const images = document.querySelectorAll('.hero-image');
    const indicators = document.querySelectorAll('.indicator');
    
    images[currentGalleryIndex].classList.remove('active');
    indicators[currentGalleryIndex].classList.remove('active');
    
    currentGalleryIndex = index;
    
    images[currentGalleryIndex].classList.add('active');
    indicators[currentGalleryIndex].classList.add('active');
}

// Auto-advance gallery every 8 seconds
setInterval(() => {
    const currentPage = document.body.getAttribute('data-page');
    if (currentPage === 'home') {
        changeGallery(1);
    }
}, 8000);

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Get current page
    const currentPage = document.body.getAttribute('data-page');
    
    // Page-specific initialization
    if (currentPage === 'home') {
        initHomePage();
    } else if (currentPage === 'factions') {
        initFactionsPage();
    } else if (currentPage === 'lore') {
        initLorePage();
    } else if (currentPage === 'characters') {
        initCharactersPage();
    }

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

// HOME PAGE
function initHomePage() {
    const cards = document.querySelectorAll('.content-card');
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Initialize gallery
    const images = document.querySelectorAll('.hero-image');
    if (images.length > 0) {
        images[0].classList.add('active');
    }
}

// FACTIONS PAGE
function initFactionsPage() {
    const factions = document.querySelectorAll('.faction-detailed');
    factions.forEach((faction, index) => {
        faction.addEventListener('mouseenter', function() {
            // Animate the faction on hover
            this.style.transform = 'translateX(15px) scale(1.02)';
            this.style.borderColor = '#d4af37';
        });
        faction.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.borderColor = '#d4af37';
        });
        
        // Add glow effect to faction header
        const header = faction.querySelector('.faction-header');
        if (header) {
            faction.addEventListener('mouseenter', function() {
                header.style.textShadow = '0 0 20px rgba(212, 175, 55, 0.8)';
            });
            faction.addEventListener('mouseleave', function() {
                const color = window.getComputedStyle(header).color;
                header.style.textShadow = '0 0 10px rgba(212, 175, 55, 0.5)';
            });
        }
    });
}

// LORE PAGE
function initLorePage() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(212, 175, 55, 0.15)';
            this.style.borderLeftColor = '#ffcc33';
            this.style.paddingLeft = '25px';
        });
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'rgba(212, 175, 55, 0.05)';
            this.style.borderLeftColor = '#d4af37';
            this.style.paddingLeft = '10px';
        });
    });

    // Add expanding effect to historical eras
    const eras = document.querySelectorAll('.historical-era');
    eras.forEach(era => {
        era.addEventListener('click', function() {
            this.classList.toggle('expanded');
            const content = this.querySelector('p');
            if (content) {
                if (this.classList.contains('expanded')) {
                    this.style.borderLeftColor = '#ffcc33';
                } else {
                    this.style.borderLeftColor = '#d4af37';
                }
            }
        });
    });
}

// CHARACTERS PAGE
function initCharactersPage() {
    const characters = document.querySelectorAll('.character-card');
    characters.forEach((character, index) => {
        // Add faction color data attribute for CSS to use
        let color = '#d4af37';
        if (character.classList.contains('imperial')) color = '#4da6ff';
        else if (character.classList.contains('chaos')) color = '#ff4d4d';
        else if (character.classList.contains('eldar')) color = '#cc99ff';
        else if (character.classList.contains('orks')) color = '#ff9933';
        else if (character.classList.contains('necron')) color = '#cccccc';
        
        character.style.setProperty('--faction-color', color);
        
        // Simple hover class toggle for CSS-driven animations
        character.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        character.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });

        // Click to expand full details
        character.addEventListener('click', function() {
            const paragraphs = this.querySelectorAll('p');
            paragraphs.forEach(p => {
                if (p.style.maxHeight) {
                    p.style.maxHeight = '';
                    p.style.overflow = 'visible';
                } else {
                    p.style.maxHeight = '500px';
                    p.style.overflow = 'hidden';
                }
            });
        });
    });
}

