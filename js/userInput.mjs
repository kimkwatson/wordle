import { initializeGame } from "./gameProgression.mjs";

let currentRow = 0;

export function startNewLine(inputs, attempt) {
    inputs.forEach((input, index) => {
        input.textContent = '';
        input.classList.remove('has-letter');
        input.classList.remove('flip');
    });

    initializeInputListeners(inputs);
}

function initializeInputListeners(inputs) {
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', function(event) {
            handleKeydown(event.key);
            if (input.textContent.length > 1) {
                input.textContent = input.textContent.charAt(0);
            }
        });
    });
}

document.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
    const key = event.key;

    if (key === 'Enter'){
        handleEnter();
    } else if (key === 'Backspace') {
        handleBackspace();
    } else if (/^[a-zA-Z]$/.test(key)) {
        handleLetterInput(key.toLowerCase());
    }
}

function handleLetterInput(letter) {
    const inputs = document.querySelectorAll(`#grid-row${currentRow} .letter-box`);

    if (input.textContent.length >= 1) {
        event.preventDefault(); // Prevent more than one letter
    } else {
        setTimeout(() => {
            input.textContent = event.key; // Set the letter
            input.classList.add('has-letter');

            // Animate box
            input.classList.add('grow');
            setTimeout(() => {
                input.classList.remove('grow');
            }, 100);
            
            // Move to the next box
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        }, 0);
    }
}

    /*for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];

        // Only fill the box if it doesn't already have a letter
        if (input.textContent.length >= 1) {
            return; // If the box already has a letter, stop the function
        }

        // Set the letter in the first empty box
        input.textContent = letter;
        input.classList.add('has-letter'); // Mark it as filled

        // Move cursor to the next box
        if (i < inputs.length - 1) {
            inputs[i + 1].focus();
        }

        break; // Exit loop after filling the first empty box
    }
}*/

function handleBackspace() {
    const inputs = document.querySelectorAll(`#grid-row${currentRow} .letter-box`);

    for (let i = inputs.length - 1; i >= 0; i--) {
        if (inputs[i].textContent !== '') {
            inputs[i].textContent = '';
            inputs[i].classList.remove('has-letter');

            // Move cursor back
            if (i > 0) {
                inputs[i - 1].focus();
            }
            break; // Exit loop after deleting the last filled box
        }
    }
}

function handleEnter() {
    const inputs = document.querySelectorAll(`#grid-row${currentRow} .letter-box`);
    let guess = '';

    inputs.forEach(input => {
        guess += input.textContent;
    });

    if (guess.length < inputs.length) {
        console.log('Not enough letters!');
        return;
    }

    checkWord(guess);

    if(guess === answerWord) {
        console.log('Yep, you got it. Bam.');
        return;
    }

    // Move to the next row
    if (currentRow < maxRows - 1) {
        currentRow++;
        document.querySelector(`#grid-row${currentRow} .letter-box`).focus();
    } else {
        console.log('Nope. Game over.');
    }
}

/*import { startNewLine } from './gameProgression.mjs';
import { checkWord, checkLetters, applyLetterColors, applyKeyboardColors } from "./feedback.mjs";

let attempt = 1;
//const inputs = document.querySelectorAll(`#grid-row${attempt} .letter-box`);
const keys = document.querySelectorAll('.key');

function getInputsForRow(attempt) {
    return document.querySelectorAll(`#grid-row${attempt} .letter-box`);
}

const inputs = getInputsForRow(attempt); // Query for the first row

inputs.forEach((input, index) => {
    // Hide the cursor
    //input.style.caretColor = 'transparent';

    input.addEventListener('keydown', function(event) {
        console.log('Keydown event triggered for input:', input);
        // Handle letter input
        if (/^[a-zA-Z]$/.test(event.key)) {
            if (input.textContent.length >= 1) {
                event.preventDefault(); // Prevent more than one letter
            } else {
                setTimeout(() => {
                    input.textContent = event.key; // Set the letter
                    input.classList.add('has-letter');

                    // Animate box
                    input.classList.add('grow');
                    setTimeout(() => {
                        input.classList.remove('grow');
                    }, 100);
                    
                    // Move to the next box
                    if (index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                }, 0);
            }
        }

        // Handle backspace
        else if (event.key === 'Backspace') {
            event.preventDefault(); // Prevent default behavior

            if (input.textContent !== '') {
                input.textContent = ''; // Remove letter
                input.classList.remove('has-letter');
            } else if (index > 0) {
                // Move to the previous box and clear its letter
                inputs[index - 1].textContent = '';
                inputs[index - 1].classList.remove('has-letter');
                inputs[index - 1].focus();
            }
        }

        // Handle enter
        else if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior
            attempt++;

            if(attempt < 6) {
                const nextInputs = getInputsForRow(attempt);
                startNewLine(nextInputs, attempt);
                console.log('New Inputs:', nextInputs);
            } else {
                console.log('Game Over! You Lost');
            }
            // Check that all 5 boxes are filled
            //if (inputs[4] === '') {
                //shakeWord();
                //showMessage('Not enough letters');
                //return; // Exit early
            //}
            
            // Check for winning word endgame
            checkWord(inputs);

            // Mark letters and keyboard colors
            let { letterColors, keyColors } = checkLetters(inputs);
            let usedKeys = [];
            // Track the letter being typed
            let inputLetter = input.textContent.trim().toUpperCase();
            if (inputLetter && !usedKeys.includes(inputLetter)) {
                    usedKeys.push(inputLetter); // Add letter to used keys list
            }

            applyLetterColors(inputs, letterColors);  // Apply colors to tiles

            inputs.forEach((input, index) => {
                setTimeout(() => {
                    input.style.animation = `flipLetter 1.5s ease forwards ${index * 150}ms`;
                    // Flip letter box
                    input.classList.add('flip');
                }, index * 150); // Flip animation timing
            });

            // Wait for flips to finish and then change colors
            setTimeout(() => {
                applyKeyboardColors(keys, keyColors);   // Apply colors to keyboard
            }, inputs.length * 500);
        }
    });

    input.addEventListener('input', function() {
        // Ensure only one letter is stored in the box
        if (input.textContent.length > 1) {
            input.textContent = input.textContent.charAt(0);
        }
    });
});

// Focus the first input initially
inputs[0].focus();

export function startNewLine(inputs, attempt) {
    // Get the new row (next attempt)
    const nextRowInputs = document.querySelectorAll(`#grid-row${attempt} .letter-box`);

    // Clear the current input fields
    nextRowInputs.forEach(input => {
        input.textContent = ''; // Clear the current input field
        input.classList.remove('has-letter', 'flip'); // Remove classes like has-letter or flip
    });

    // Focus on the first letter box in the next row
    if (nextRowInputs.length > 0) {
        nextRowInputs[0].focus(); // Focus the first input of the next line
        console.log(`Focus moved to: grid-row${attempt} first box.`);
    } else {
        console.log('No more rows available!');
    }

    console.log(`Starting new line: Attempt ${attempt}`);
}*/