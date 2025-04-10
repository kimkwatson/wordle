import { getInputsForRow, getKeyboardButtons, handleLetter, handleBackspace, handleEnter } from './userInput2.mjs';
import { displayMessage } from './feedback.mjs';
import { getRandomWord } from './wordSelection.mjs';

let attempt = 1;
localStorage.setItem("Attempt", JSON.stringify(attempt));
let currentWord = '';
let games = localStorage.getItem("Total Games") || 0;
let wins = parseInt(localStorage.getItem("Wins")) || 0;
let currentStreak = parseInt(localStorage.getItem("Current Streak")) || 0;

const grid = document.querySelector('#grid');
let distribution = localStorage.getItem("Guess Distribution");
if (distribution === null) {
    distribution = {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0
    };
    localStorage.setItem("Guess Distribution", JSON.stringify(distribution));
} else {
    distribution = JSON.parse(distribution);
}

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener("load", () => {
        attempt = 1;
      });

    initializeGame(); // Set up event listeners and start game when page loads
});

async function initializeGame() {
    window.addEventListener('focus', () => {
        // Focus on first input box
        const firstInputBox = document.querySelector('.letter-box');
        if (firstInputBox && !firstInputBox.contains(document.activeElement)) {
            firstInputBox.focus();
        }
    });
    
    grid.addEventListener('mousedown', (event) => {
        event.preventDefault();
    });

    currentWord = await getRandomWord();  // Await the result of getRandomWord
        if (currentWord) {
        console.log('Answer Word: ', currentWord);
        localStorage.setItem('Answer Word', currentWord);
        continueGame();
        } else {
            console.log('no word found');
        }
}

export function continueGame() {
    if (attempt <= 6) {
        getGuess();
    } else {
        console.log('Sorry, no more guesses.');
        setTimeout(() => {
            displayMessage(currentWord);
        }, currentWord.length * 600);
        let didWin = false;
        endGame(didWin);
    }
}

export function getGuess() {
    // Get a single row for word guess
    const inputs = getInputsForRow(attempt);

    // Focus on first input of row
    inputs[0].focus();

    document.addEventListener('click', (event) => {
        if (event.type === 'keydown') return;
        event.preventDefault();
        inputs[0].focus();
    });

    // Listen for user action
    inputs.forEach((input, index) => {
        // Hide the cursor
        input.style.caretColor = 'transparent';
        
        // Prevent clicking on input fields
        input.addEventListener('click', (event) => {
            event.preventDefault();
        });

        // Allow clicking on physical keyboard
        input.addEventListener('keydown', handleKeydown);
        input.addEventListener('input', handleInput);

        const keyboard = getKeyboardButtons();
        keyboard.forEach((keyButton) => {
            keyButton.addEventListener('click', () => {
                const key = keyButton.textContent.trim();
                //console.log(keyValue);
                handleKeydown({ key, inputs, input, index });
            });
            
        });
        
        function handleKeydown(event) {
            console.log('Keydown event triggered for input:', input);
            
            // Handle letter input
            if (/^[a-zA-Z]$/.test(event.key)) {
                if (input.textContent.length >= 1) {
                    event.preventDefault(); // Prevent more than one letter
                } else {
                    input.textContent = event.key; // Set the letter
                    input.classList.add('has-letter');
                    console.log('handling letter');
                    handleLetter(inputs, input, index);
                }
            } else if (event.key === 'Backspace') {
                event.preventDefault(); // Prevent default behavior
                handleBackspace(inputs, input, index);
                
            } else if (event.key === 'Enter') {
                event.preventDefault(); // Prevent default behavior
                if (inputs[4].textContent === '') {
                    displayMessage('Not enough letters');
                } else {
                    handleEnter(inputs, input, currentWord);
                }
            } else if (event.key === 'Tab') {
                event.preventDefault(); // Do not allow tab to move cursor
            }
        };  
        
        function handleInput() {
            // Ensure only one letter is stored in the box
            if (input.textContent.length > 1) {
                input.textContent = input.textContent.charAt(0);
            }  
        };
    });   
}

export function storeGuess(word) {
    let guess = word;

    localStorage.setItem("Guess", JSON.stringify(guess));
}

export function nextLine() {
    attempt++;
    localStorage.setItem("Attempt", JSON.stringify(attempt));
    console.log(`Starting new line: Attempt ${attempt}`);
}

export function updateStatistics() {
    games++;

    distribution = JSON.parse(localStorage.getItem("Guess Distribution"));
    distribution[attempt]++;
    
    // Update local storage
    localStorage.setItem("Total Games", JSON.stringify(games));
    localStorage.setItem("Wins", JSON.stringify(wins))
    localStorage.setItem("Current Streak", JSON.stringify(currentStreak));
    localStorage.setItem("Guess Distribution", JSON.stringify(distribution));
}

export function getMessage() {
    let message = '';
    if (attempt === 1) {
        message = 'GENIUS';
    } else if (attempt === 2) {
        message = 'MAGNIFICENT';
    } else if (attempt === 3) {
        message = 'IMPRESSIVE';
    } else if (attempt === 4) {
        message = 'SPLENDID';
    } else if (attempt === 5) {
        message = 'GREAT';
    } else if (attempt === 6) {
        message = 'PHEW';
    }

    return message;
}

function playAgain () {
    const buttonDiv = document.getElementById('button-div');
    buttonDiv.style.display = 'flex';
    
    const playAgainButton = document.querySelector('.play-again-button');
    playAgainButton.addEventListener('click', function() {
        window.location.reload(); // Refresh the page
    });    
}

export function endGame(didWin) {
    console.log(didWin);
    if (didWin) {
        wins++;
        currentStreak++;
    } else {
        currentStreak = 0;
    }

    updateStatistics();
    setTimeout(() => {
        playAgain();
        const modal2 = document.getElementById('stats-modal');
        modal2.style.display = 'block';
        renderStatistics();
    }, 3500);
}