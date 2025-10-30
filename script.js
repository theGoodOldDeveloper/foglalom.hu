// DOM elemek lekérése
const colorBtn = document.getElementById('colorBtn');
const particleBtn = document.getElementById('particleBtn');
const mainTitle = document.getElementById('mainTitle');
const particlesContainer = document.getElementById('particles');

// Modal elemek
const serviceModal = document.getElementById('serviceModal');
const serviceModalBtn = document.getElementById('serviceModalBtn');
const consultationBtn = document.getElementById('consultationBtn');
const closeModalIcon = document.querySelector('.close');
const modalContent = document.querySelector('#serviceModal .modal-content');

// Új modal elemek
const toggleButtons = document.querySelectorAll('.toggle-btn');
const monthlyPrices = document.querySelectorAll('.monthly-price');
const yearlyPrices = document.querySelectorAll('.yearly-price');
const monthlyPeriods = document.querySelectorAll('.monthly-period');
const yearlyPeriods = document.querySelectorAll('.yearly-period');
const cardButtons = document.querySelectorAll('.card-btn');

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

// Színek betöltése localStorage-ból
function loadSavedColor() {
    const savedColorIndex = localStorage.getItem('selectedColorIndex');
    if (savedColorIndex !== null) {
        currentColorIndex = parseInt(savedColorIndex);
        document.body.style.background = colors[currentColorIndex];
        console.log(`🎨 Mentett szín betöltve: ${currentColorIndex + 1}/${colors.length}`);
    }
}

// Színek váltása gomb eseménye
colorBtn.addEventListener('click', function() {
    if (isAnimating) return;
    
    isAnimating = true;
    colorBtn.disabled = true;
    
    // Háttér szín váltása
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    document.body.style.background = colors[currentColorIndex];
    
    // Szín mentése localStorage-ba
    localStorage.setItem('selectedColorIndex', currentColorIndex);
    console.log(`💾 Szín elmentve: ${currentColorIndex + 1}/${colors.length}`);
    
    // Gomb animáció
    colorBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        colorBtn.style.transform = 'scale(1)';
        isAnimating = false;
        colorBtn.disabled = false;
    }, 1000);
});


// Részecske effekt gomb eseménye
particleBtn.addEventListener('click', function() {
    if (isAnimating) return;
    
    isAnimating = true;
    particleBtn.disabled = true;
    
    // Gomb animáció
    particleBtn.style.transform = 'scale(0.95)';
    
    // Részecskék létrehozása
    createParticles();
    
    setTimeout(() => {
        particleBtn.style.transform = 'scale(1)';
        isAnimating = false;
        particleBtn.disabled = false;
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

// Modal működés
function openModal() {
    serviceModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Scroll letiltása
}

// Pricing összefoglaló kártyák (CTA szekció)
const summaryPlanCards = document.querySelectorAll('.pricing-cards .pricing-card-item');

function showAllPlansInModal() {
    document.querySelectorAll('.pricing-card-new').forEach(card => {
        card.style.display = '';
    });
    if (modalContent) {
        modalContent.classList.remove('narrow');
    }
}

function showOnlyPlanInModal(planKey) {
    const planClassMap = {
        mini: '.mini-card',
        pro: '.pro-card',
        super: '.super-card'
    };
    const selectorToShow = planClassMap[planKey];
    if (!selectorToShow) {
        showAllPlansInModal();
        return;
    }
    document.querySelectorAll('.pricing-card-new').forEach(card => {
        card.style.display = 'none';
    });
    const target = document.querySelector(selectorToShow);
    if (target) {
        target.style.display = '';
    }
    if (modalContent) {
        modalContent.classList.add('narrow');
    }
}

function closeModalFunc() {
    serviceModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Scroll visszaengedése
}

// Modal eseménykezelők
if (serviceModalBtn) {
    serviceModalBtn.addEventListener('click', () => {
        showAllPlansInModal();
        openModal();
    });
}

// Bind all close triggers: top-right X and any element with data-close-modal
document.querySelectorAll('.close, [data-close-modal]').forEach(el => {
    el.addEventListener('click', closeModalFunc);
});

// Modal bezárása a háttérre kattintva
window.addEventListener('click', function(event) {
    if (event.target === serviceModal) {
        closeModalFunc();
    }
});

// ESC billentyű modal bezárásához
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && serviceModal.style.display === 'block') {
        closeModalFunc();
    }
});

// Pricing toggle funkcionalitás
function handleToggleClick(event) {
    const clickedPeriod = event.target.getAttribute('data-period');
    
    // Toggle gombok állapotának frissítése
    toggleButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Árak és periódusok megjelenítése/elrejtése
    if (clickedPeriod === 'monthly') {
        monthlyPrices.forEach(price => price.style.display = 'block');
        yearlyPrices.forEach(price => price.style.display = 'none');
        monthlyPeriods.forEach(period => period.style.display = 'block');
        yearlyPeriods.forEach(period => period.style.display = 'none');
    } else {
        monthlyPrices.forEach(price => price.style.display = 'none');
        yearlyPrices.forEach(price => price.style.display = 'block');
        monthlyPeriods.forEach(period => period.style.display = 'none');
        yearlyPeriods.forEach(period => period.style.display = 'block');
    }
}

// Toggle gombok eseménykezelője
toggleButtons.forEach(btn => {
    btn.addEventListener('click', handleToggleClick);
});

// Konzultáció gombok eseménykezelője
function handleConsultationClick() {
    // EasyAppointments link megnyitása új ablakban
    window.open('https://easyappointments.thegoodolddeveloper.cloud/index.php/?provider=9&service=4', '_blank');
}

if (consultationBtn) {
    consultationBtn.addEventListener('click', handleConsultationClick);
}

// Új modal gombok eseménykezelője
cardButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Modal bezárása és konzultáció link megnyitása
        closeModalFunc();
        setTimeout(() => {
            window.open('https://easyappointments.thegoodolddeveloper.cloud/index.php/?provider=9&service=4', '_blank');
        }, 300);
    });
});

// Összefoglaló kártyák kattintása: csak a saját csomag jelenjen meg a modalban
summaryPlanCards.forEach(card => {
    card.addEventListener('click', () => {
        const planKey = card.getAttribute('data-plan');
        showOnlyPlanInModal(planKey);
        openModal();
    });
});

// Konzol üzenet
console.log('🚀 The Good Old Developer - Hello World oldal betöltve!');
console.log('💡 Próbáld ki a gombokat a legjobb élményért!');
console.log('📧 Kapcsolat: thegoodolddeveloper@gmail.com');

// Oldal betöltésekor indított animációk
window.addEventListener('load', () => {
    // Mentett szín betöltése
    loadSavedColor();
    
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
