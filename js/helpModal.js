const modal = document.querySelector('#help-modal');
const content = document.querySelector('.instructions');
const helpButton = document.querySelector('#help-button');
const closeButton = document.querySelector('.close-button');

modal.style.display = 'none';

helpButton.addEventListener('click', () => {
    modal.style.display = 'block';
    renderInstructions();
    renderwExample();
    renderiExample();
    renderuExample();
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal if user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target === document.querySelector('body')) {
        modal.style.display = 'none';
    }
});

function renderInstructions() {
    
    content.innerHTML = `
        <h1>How To Play</h1>
        <h2>Guess the Wordle in 6 tries.</h2>
        <ul id="bullet-list">
          <li>Each guess must be a valid 5-letter word.</li>
          <li>The color of the tiles will change to show how close your guess was to the word.</li>
        </ul>
        <h2><b>Examples</b></h2>
        <div id="W-example"></div>
        <p><b>W</b> is in the word and in the correct spot.</p>
        <div id="I-example"></div>
        <p><b>I</b> is in the word but in the wrog spot.</p>
        <div id="U-example"></div>
        <p><b>U</b> is not in the word in any spot.</p>
        <div id="instruction-footer"><img src="images/green-statistics.png!sw800"><p>Enjoy unlimited play and game statistics.</p></div>
    `
}

function renderwExample() {
    const wExample = ['W', 'O', 'R', 'D', 'Y'];
    let html = '';

    for (const char of wExample) {
        if (char === 'W') {
            html += `<span class="green-highlight">${char}</span>`;
        } else {
            html += `<span>${char}</span>`;
        }
    }

    document.getElementById('W-example').innerHTML = html;
}

function renderiExample() {
    const iExample = ['L', 'I', 'G', 'H', 'T'];
    let html = '';

    for (const char of iExample) {
        if (char === 'I') {
            html += `<span class="yellow-highlight">${char}</span>`;
        } else {
            html += `<span>${char}</span>`;
        }
    }

    document.getElementById('I-example').innerHTML = html;
}

function renderuExample() {
    const uExample = ['R', 'O', 'G', 'U', 'E'];
    let html = '';

    for (const char of uExample) {
        if (char === 'U') {
            html += `<span class="gray-highlight">${char}</span>`;
        } else {
            html += `<span>${char}</span>`;
        }
    }

    document.getElementById('U-example').innerHTML = html;
}


    