// Main JavaScript for Portfolio Website

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initParticleBackground();
    initTypewriter();
    initScrollAnimations();
    initSkillsChart();
    initMobileMenu();
    initSmoothScrolling();
});

// Particle Background System
function initParticleBackground() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Typewriter Effect
function initTypewriter() {
    const typed = new Typed('#typed-name', {
        strings: ['Westlund', 'Engineer', 'Problem Solver', 'Innovator'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate skill items with stagger
                if (entry.target.classList.contains('section-reveal')) {
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section-reveal').forEach(section => {
        observer.observe(section);
    });
    
    // Observe skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// Skills Chart
function initSkillsChart() {
    const chartDom = document.getElementById('skills-chart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(26, 26, 26, 0.9)',
            borderColor: '#00d4ff',
            textStyle: {
                color: '#ffffff'
            }
        },
        radar: {
            indicator: [
                { name: 'Programming', max: 100 },
                { name: 'CAD Design', max: 100 },
                { name: 'Manufacturing', max: 100 },
                { name: 'Environmental', max: 100 },
                { name: 'Analysis', max: 100 },
                { name: 'Leadership', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 4,
            axisName: {
                color: '#e0e0e0',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 212, 255, 0.2)'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 212, 255, 0.3)'
                }
            }
        },
        series: [{
            name: 'Skills',
            type: 'radar',
            data: [{
                value: [85, 90, 80, 75, 85, 80],
                name: 'Technical Skills',
                areaStyle: {
                    color: 'rgba(0, 212, 255, 0.2)'
                },
                lineStyle: {
                    color: '#00d4ff',
                    width: 2
                },
                itemStyle: {
                    color: '#00d4ff'
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };
    
    myChart.setOption(option);
    
    // Responsive chart
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // Create mobile menu if it doesn't exist
            let mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.id = 'mobile-menu';
                mobileMenu.className = 'md:hidden bg-black bg-opacity-95 border-t border-gray-800';
                mobileMenu.innerHTML = `
                    <div class="px-6 py-4 space-y-4">
                        <a href="#home" class="block text-white hover:text-blue-400">Home</a>
                        <a href="about.html" class="block text-white hover:text-blue-400">About</a>
                        <a href="projects.html" class="block text-white hover:text-blue-400">Projects</a>
                        <a href="contact.html" class="block text-white hover:text-blue-400">Contact</a>
                    </div>
                `;
                nav.appendChild(mobileMenu);
            }
            
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                rotateX: 5,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateX: 0,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
});

// Color cycling effect for emphasis
function initColorCycling() {
    const elements = document.querySelectorAll('.glow-effect');
    
    elements.forEach(element => {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            element.style.textShadow = `0 0 20px hsl(${hue}, 100%, 50%)`;
        }, 50);
    });
}

// Initialize color cycling after page load
window.addEventListener('load', initColorCycling);

// Add loading animation
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50';
    loader.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-white text-lg">Loading Portfolio...</p>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Remove loader after animations complete
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }, 1000);
});

// Form validation helper (for future contact form)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formData) {
    const errors = {};
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters long';
    }
    
    if (!formData.email || !validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters long';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

// Export functions for use in other pages
window.PortfolioJS = {
    validateEmail,
    validateForm,
    initScrollAnimations,
    initMobileMenu
};