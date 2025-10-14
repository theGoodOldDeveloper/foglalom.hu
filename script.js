// DOM elemek lekérése
const colorBtn = document.getElementById('colorBtn');
const textBtn = document.getElementById('textBtn');
const particleBtn = document.getElementById('particleBtn');
const demoDisplay = document.getElementById('demoDisplay');
const mainTitle = document.getElementById('mainTitle');
const particlesContainer = document.getElementById('particles');

// Színek tömbje a háttér változtatáshoz
const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
];

let currentColorIndex = 0;
let isAnimating = false;

// Színek váltása gomb eseménye
colorBtn.addEventListener('click', function() {
    if (isAnimating) return;
    
    isAnimating = true;
    colorBtn.disabled = true;
    
    // Háttér szín váltása
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    document.body.style.background = colors[currentColorIndex];
    
    // Demo terület animációja
    demoDisplay.style.background = 'rgba(255, 255, 255, 0.1)';
    demoDisplay.style.transform = 'scale(1.05)';
    demoDisplay.innerHTML = `
        <div style="color: white; font-weight: bold; font-size: 1.2rem;">
            🎨 Színek váltva!<br>
            <small>Új háttér: ${currentColorIndex + 1}/${colors.length}</small>
        </div>
    `;
    
    setTimeout(() => {
        demoDisplay.style.transform = 'scale(1)';
        isAnimating = false;
        colorBtn.disabled = false;
    }, 1000);
});

// Szöveg animáció gomb eseménye
textBtn.addEventListener('click', function() {
    if (isAnimating) return;
    
    isAnimating = true;
    textBtn.disabled = true;
    
    // Főcím animációja
    mainTitle.style.animation = 'textWave 0.8s ease-in-out';
    
    // Demo terület változtatása
    const messages = [
        '✨ Hello World animálva!',
        '🚀 Szöveg hullámozik!',
        '💫 Dinamikus effekt!',
        '🎯 Interaktív élmény!',
        '🌟 Fantasztikus animáció!'
    ];
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
        demoDisplay.innerHTML = `
            <div style="color: #333; font-weight: bold; font-size: 1.3rem; animation: fadeInUp 0.5s ease-out;">
                ${messages[messageIndex]}
            </div>
        `;
        messageIndex = (messageIndex + 1) % messages.length;
    }, 200);
    
    setTimeout(() => {
        clearInterval(messageInterval);
        mainTitle.style.animation = '';
        demoDisplay.innerHTML = '<p>Animáció befejezve! Próbáld ki a többi gombot is!</p>';
        isAnimating = false;
        textBtn.disabled = false;
    }, 3000);
});

// Részecske effekt gomb eseménye
particleBtn.addEventListener('click', function() {
    if (isAnimating) return;
    
    isAnimating = true;
    particleBtn.disabled = true;
    
    // Demo terület üzenet
    demoDisplay.innerHTML = `
        <div style="color: #333; font-weight: bold; font-size: 1.2rem;">
            ✨ Részecske effekt indítása...<br>
            <small>Nézd a képernyőt!</small>
        </div>
    `;
    
    // Részecskék létrehozása
    createParticles();
    
    setTimeout(() => {
        isAnimating = false;
        particleBtn.disabled = false;
        demoDisplay.innerHTML = '<p>Részecske show befejezve! 🎆</p>';
    }, 4000);
});

// Részecskék létrehozása
function createParticles() {
    // Eltávolítjuk a korábbi részecskéket
    particlesContainer.innerHTML = '';
    
    const particleCount = 50;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Véletlenszerű tulajdonságok
            const size = Math.random() * 8 + 4;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 2 + 2;
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.backgroundColor = color;
            particle.style.left = left + '%';
            particle.style.animationDuration = animationDuration + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particlesContainer.appendChild(particle);
            
            // Részecske eltávolítása animáció után
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, (animationDuration + 2) * 1000);
        }, i * 50);
    }
}

// Statisztikák animációja
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 20);
    });
}

// Intersection Observer a statisztikákhoz
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observer hozzáadása a statisztikák szekcióhoz
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}

// Parallax effekt a scroll-hoz
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.header');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Smooth scroll a feature kártyákhoz
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-10px)';
        }, 150);
    });
});

// Random hover effekt a logo-hoz
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('mouseenter', function() {
        const randomRotation = Math.random() * 20 - 10; // -10 és 10 közötti véletlen szám
        this.style.transform = `scale(1.1) rotate(${randomRotation}deg)`;
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Konzol üzenet
console.log('🚀 The Good Old Developer - Hello World oldal betöltve!');
console.log('💡 Próbáld ki a gombokat a legjobb élményért!');
console.log('📧 Kapcsolat: thegoodolddeveloper@gmail.com');

// Oldal betöltésekor indított animációk
window.addEventListener('load', () => {
    // Kis késleltetés után indítjuk a statisztikák animációját
    setTimeout(() => {
        const statsVisible = document.querySelector('.stats-section').getBoundingClientRect().top < window.innerHeight;
        if (statsVisible) {
            animateStats();
        }
    }, 1000);
});

// Responsive menu (ha szükséges)
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    
    // Mobil eszközön csökkentjük az animációk intenzitását
    if (isMobile) {
        document.body.style.setProperty('--animation-duration', '0.5s');
    } else {
        document.body.style.setProperty('--animation-duration', '1s');
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Első betöltéskor is futtatjuk
