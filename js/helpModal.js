const modal = document.querySelector('#help-modal');
const helpButton = document.querySelector('#help-button');
const closeButton = document.querySelector('.close-button');

modal.style.display = 'none';

helpButton.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal if user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});