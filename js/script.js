document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    
    function toggleExpand() {
        container.classList.toggle('expanded');
    }

    // Add click event to container
    container.addEventListener('click', toggleExpand);

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
            container.classList.remove('expanded');
        }
    });
}); 