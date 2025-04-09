import { getInputsForRow, getKeyboardButtons, handleLetter, handleBackspace, handleEnter } from './userInput2.mjs';
import { displayMessage } from './feedback.mjs';
import { getRandomWord } from './wordSelection.mjs';

let attempt = 1;
let currentWord = '';
//let isGameWon = false;
//let totalAttempts = 6;
let wins = 0;
let distribution = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0
};

const grid = document.querySelector('#grid');

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("load", () => {
        attempt = 1;
      });

    initializeGame(); // Set up event listeners and start game when page loads
});

async function initializeGame() {
    window.addEventListener('focus', () => {
        // Automatically focus the first input box when the page is focused
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
        endGame();
    }

    //nextLine();
}

export function getGuess() {
    const inputs = getInputsForRow(attempt); // Query for the first row
    // Focus the first input initially
    inputs[0].focus();
    console.log(attempt)
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
        
        // Allow clicking on keyboard keys
        /*document.querySelectorAll('.key').forEach((button) => {
            button.addEventListener('click', () => {
                const key = button.textContent.trim();
                console.log(key);
                handleKeydown({ key: key });
            });
        });*/
        
        //input.addEventListener('keydown', function(event) {
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
                console.log('just checking...', currentWord);
                handleEnter(inputs, input, currentWord);
            } else if (event.key === 'Tab') {
                event.preventDefault(); // Do not allow tab to move cursor
            }
        };  
        //input.addEventListener('input', function() {
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

    console.log('Attempt:', attempt);
    //getGuess();
    
        /*if (nextRowInputs.length > 0) {
            nextRowInputs[0].focus(); // Focus the first input of the next line
            console.log(`Focus moved to: grid-row${attempt} first box.`);
        } else {
            console.log('No more rows available!');
        }*/
    
        console.log(`Starting new line: Attempt ${attempt}`);
}

export function updateStatistics() {
    wins++;
    distribution[attempt]++;
    localStorage.setItem("Wins", JSON.stringify(wins))
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
        window.location.reload(); // Refreshes the page
    });    
}

export function endGame() {
    playAgain();
}

/*export function checkGameStatus(inputs) {
    if (isGameWon) {
        console.log('Got it! You win, woohoo.');
        return;
    }

    if (attempt > totalAttempts) {
        console.log(`Nope, not it. The word was: ${currentWord}`);
        return;
    }

    checkWord(inputs);
    let { letterColors, keyColors } = checkLetters(inputs);
    applyLetterColors(inputs, letterColors);
    applyKeyboardColors(keyColors);

    if (inputs.every((input, index) => input.textContent.toUpperCase() === currentWord[index].toUpperCase())) {
        isGameWon = true;
        console.log('Yep, that is correct. Good job');
    } else {
        attempt++;
        const nextRowInputs = document.querySelectorAll(`#grid-row${attempt} .letter-box`);
        if (nextRowInputs.length > 0) {
            console.log('Nope. Not right. Try again.');
            storeGuess(inputs.join());
            startNewLine(nextRowInputs, attempt);
        }
    }
}*/

/*function handleEnter() {
    const inputs = document.querySelectorAll(#grid-row${currentRow} .letter-box);

    let { letterColors, keyColors } = checkLetters(inputs, answerWord);

    applyLetterColors(inputs, letterColors);

    setTimeout(() => {
        applyKeyboardColors(document.querySelectorAll('.key'), keyColors);
    }, inputs.length * 500);

    checkWord(inputs, answerWord, (won) => {
        if (won) {
            console.log("You won!");
        } else if (currentRow < maxRows - 1) {
            currentRow++;
            document.querySelector(#grid-row${currentRow} .letter-box).focus();
        } else {
            console.log("Game Over! You lost.");
        }
    });
}*/

export function saveGameStats() {
    saveStats(attempt, gameWon);  // Call the statistics module to save progress
}