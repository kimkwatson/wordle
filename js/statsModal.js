
const modal2 = document.querySelector('#stats-modal');
const statsButton = document.querySelector('#stats-button');
const closeButton2 = document.querySelector('.close-button2');

modal2.style.display = 'none';

statsButton.addEventListener('click', () => {
    modal2.style.display = 'block';
    renderStatistics();
});

closeButton2.addEventListener('click', () => {
    modal2.style.display = 'none';
});

// Close modal if user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target === document.querySelector('body')) {
        modal2.style.display = 'none';
    }
});

function renderStatistics() {
    const wins = localStorage.getItem('Wins');
    console.log(wins);
    document.getElementById('loaded-stats').innerHTML =`
        <span>Wins: ${wins}</span>
        <span>Win %: ${wins}</span>
        <span>Current Streak: ${wins}</span>
        <h2>Guess Distribution</h2>
        <div>Bar Charts</div>
    `;
}