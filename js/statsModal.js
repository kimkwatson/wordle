
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
    const games = localStorage.getItem('Total Games') || 0;
    const wins = localStorage.getItem('Wins') || 0;
    const winPercent = Math.ceil(((Number(wins))/ games) * 100) || 0;
    const currentStreak = localStorage.getItem('Current Streak') || 0;

    console.log(wins);
    document.getElementById('loaded-stats').innerHTML =`
        <span>Played: ${games}</span>
        <span>Win %: ${winPercent}</span>
        <span>Current Streak: ${currentStreak}</span>
        <h2>Guess Distribution</h2>
        <div>Bar Charts</div>
    `;
}