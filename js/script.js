document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const body = document.querySelector('body');
    
    // Highlight active page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkHref = link.getAttribute('href');
        // Compare the current page with the link href, handling spaces
        if (currentPage === linkHref || 
            (currentPage === 'strategies%20and%20tips.html' && linkHref === 'strategies and tips.html')) {
            link.classList.add('active');
        }
    });
    
    // Set active card based on current page
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const link = card.querySelector('a');
        if (link) {
            const linkHref = link.getAttribute('href');
            if (currentPage === linkHref || 
                (currentPage === 'strategies%20and%20tips.html' && linkHref === 'strategies and tips.html')) {
                card.classList.add('active');
            }
        }
    });
    
    function toggleExpand(event) {
        // If clicking on the container itself (not a card), toggle expand
        if (event.target === container) {
            if (!container.classList.contains('expanded')) {
                // Opening animation
                container.classList.add('expanded');
                const cardTexts = document.querySelectorAll('.card-title, .card-text');
                cardTexts.forEach(text => {
                    text.style.animation = 'fadeIn 0.5s ease-in-out forwards';
                });
            } else {
                closeCards();
            }
        }
    }

    function closeCards() {
        // Start both animations at the same time
        container.classList.add('closing');
        
        // Add fade-out animation class to texts
        const cardTexts = document.querySelectorAll('.card-title, .card-text');
        cardTexts.forEach(text => {
            text.style.animation = 'fadeOut 0.5s ease-in-out forwards';
        });

        // Remove expanded class after animation completes
        setTimeout(() => {
            container.classList.remove('expanded', 'closing');
            // Reset animation
            cardTexts.forEach(text => {
                text.style.animation = '';
            });
        }, 500);
    }

    // Add click event to container
    container.addEventListener('click', toggleExpand);

    // Add click event to body to close expanded cards when clicking outside
    body.addEventListener('click', function(event) {
        // Check if container is expanded and click is outside the container
        if (container.classList.contains('expanded') && 
            !container.contains(event.target) && 
            event.target !== container) {
            closeCards();
        }
    });

    // Add hover sound effect
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const hoverSound = new Audio('sounds/card-hover.mp3');
            hoverSound.volume = 0.2;
            hoverSound.play();
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && container.classList.contains('expanded')) {
            closeCards();
        }
    });
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Add smooth scroll to top functionality with slower animation
document.querySelectorAll('.footer-link').forEach(link => {
    if (link.textContent.includes('Back to Top')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const duration = 1500; // 1.5 seconds
            const start = window.pageYOffset;
            const startTime = performance.now();
            
            function scrollStep(timestamp) {
                const currentTime = timestamp - startTime;
                const progress = Math.min(currentTime / duration, 1);
                
                // Easing function for smooth deceleration
                const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
                const easedProgress = easeOutCubic(progress);
                
                window.scrollTo(0, start * (1 - easedProgress));
                
                if (progress < 1) {
                    requestAnimationFrame(scrollStep);
                }
            }
            
            requestAnimationFrame(scrollStep);
        });
    }
}); 