
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

    document.getElementById('loaded-stats').innerHTML =`
        <div>${games}</div>
        <div>${winPercent}</div>
        <div>${currentStreak}</div>
        <span>Played</span>
        <span>Win   %</span>
        <span>Current Streak</span>
    `;

    document.getElementById('loaded-dist').innerHTML =`
        <div>1</div>
        <span></span>
        <div>2</div>
        <span></span>
        <div>3</div>
        <span></span>
        <div>4</div>
        <span></span>
        <div>5</div>
        <span></span>
        <div>6</div>
        <span></span>
    `
    const distribution = JSON.parse(localStorage.getItem('Guess Distribution'));
    const maxValue = Math.max(...Object.values(distribution));

    const minWidth = 22; // Minimum width for a bar with count 0
    const increment = 1;  // Increment width per count increase

    Object.entries(distribution).forEach(([guess, count]) => {
        const bar = document.querySelector(`#loaded-dist div:nth-child(${guess * 2 - 1}) + span`);
    
        if (bar) {
            const width = maxValue > 0 ? (minWidth + (count / maxValue) * (100 - minWidth)) : minWidth;
        
            // Apply width to bar
            bar.style.width = `${width}px`;

            bar.textContent = count;
        }
    });
}

    