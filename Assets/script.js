// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        const name = contactForm.querySelector('#name').value.trim();
        const email = contactForm.querySelector('#email').value.trim();
        const message = contactForm.querySelector('#message').value.trim();

        // Basic validation
        if (!name || !email || !message) {
            showToast('Please fill in name, email, and message.');
            return;
        }

        // Simple email pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showToast('Please enter a valid email address.');
            return;
        }

        // Show send feedback
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';

        // Reset form
        contactForm.reset();

        // Show toast confirmation
        showToast('Thanks — I received your message. I will respond shortly.');

        // Restore button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// Small toast helper
function showToast(message) {
    const container = document.getElementById('toast');
    if (!container) return;

    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    container.appendChild(el);

    setTimeout(() => {
        el.style.opacity = '0';
        setTimeout(() => container.removeChild(el), 400);
    }, 3500);
}

// Smooth scroll for navigation links and bookmarks
function setActiveLink(hash) {
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === hash);
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        const navbar = document.querySelector('.navbar');
        const offset = navbar ? navbar.offsetHeight : 0;
        
        if (target && href !== '#') {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
            history.pushState(null, '', href);
            setActiveLink(href);
        }
    });
});

// Scroll to hash on load (if any)
window.addEventListener('load', () => {
    if (location.hash) {
        const target = document.querySelector(location.hash);
        const navbar = document.querySelector('.navbar');
        const offset = navbar ? navbar.offsetHeight : 0;
        if (target) {
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
            setActiveLink(location.hash);
        }
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate bars
            if (entry.target.classList && entry.target.classList.contains('skill-fill')) {
                const value = Number(entry.target.dataset.value) || 0;
                entry.target.style.width = value + '%';
                entry.target.setAttribute('aria-valuenow', value);
                observer.unobserve(entry.target);
                return;
            }

            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards and project cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Observe skill bars
document.querySelectorAll('.skill-fill').forEach(fill => {
    fill.style.width = '0%';
    fill.setAttribute('aria-valuenow', '0');
    observer.observe(fill);
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    let currentSection = '';
    
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Close mobile menu if viewport resized larger than mobile
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
});

// Add styles for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
    }
`;
document.head.appendChild(style);

/* Modal functionality */
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('resume-open');
const closeModalBtn = document.getElementById('closeModal');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});