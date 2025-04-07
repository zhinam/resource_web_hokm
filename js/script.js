function toggleExpand() {
    document.querySelector('.container').classList.toggle('expanded');
}

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
    const container = document.querySelector('.container');
    if (e.key === 'Escape' && container.classList.contains('expanded')) {
        container.classList.remove('expanded');
    }
}); 