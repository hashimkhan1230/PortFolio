// Particle background animation
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const numParticles = 80;
const particleColors = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B']; // Purple, Pink, Blue, Green, Yellow

// Function to set canvas dimensions
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1; // Size between 1 and 6
        this.speedX = Math.random() * 3 - 1.5; // Speed between -1.5 and 1.5
        this.speedY = Math.random() * 3 - 1.5;
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
        this.opacity = Math.random() * 0.5 + 0.1; // Opacity between 0.1 and 0.6
    }

    // Draw particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1; // Reset alpha
    }

    // Update particle position
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.speedX *= -1;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.speedY *= -1;
        }
    }
}

// Initialize particles
function init() {
    setCanvasSize();
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Draw connecting lines between close particles
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) { // Connect particles within 120px
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - (distance / 120)})`; // Fading lines
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Event Listeners
window.addEventListener('resize', init); // Re-initialize particles on resize
window.onload = function() {
    init(); // Initialize on load
    animate(); // Start animation
}