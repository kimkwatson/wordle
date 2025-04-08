const play = document.querySelector('.play-button');

play.addEventListener('click', handlePlayButton);

function handlePlayButton () {
    window.location.replace('index.html'); // Go to game
}