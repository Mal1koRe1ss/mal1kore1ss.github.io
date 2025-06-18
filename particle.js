// Create animated particles
function createParticles() {
    const particleContainer = document.querySelector('.bg-particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particleContainer.appendChild(particle);
    }
}

// Handle entrance animation
function startEntranceAnimation() {
    const mainContainer = document.getElementById('mainContainer');
    
    // Remove loading class and add loaded class after a short delay
    setTimeout(() => {
        mainContainer.classList.remove('loading');
        mainContainer.classList.add('loaded');
    }, 300);
}

// Initialize on page load
window.addEventListener('load', function() {
    createParticles();
    startEntranceAnimation();
});