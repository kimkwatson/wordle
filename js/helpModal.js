const modal = document.querySelector('#help-modal');
const helpButton = document.querySelector('#help-button');
const closeButton = document.querySelector('.close-button');

modal.style.display = 'none';

helpButton.addEventListener('click', () => {
    
    modal.style.display = 'flex';
    renderwExample();
    renderiExample();
    renderuExample();
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


    