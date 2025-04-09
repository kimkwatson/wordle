//import { newLine } from './gameProgression.mjs';
import { checkWord, checkLetters, applyLetterColors, applyKeyboardColors } from "./feedback.mjs";
import { continueGame } from "./gameProgression.mjs";
//import { checkGameStatus, initializeGame } from "./gameProgression.mjs";

//let answerWord = 'HELLO';
//let attempt = 1;
//const inputs = document.querySelectorAll(`#grid-row${attempt} .letter-box`);
const keys = document.querySelectorAll('.key');

export function getInputsForRow(attempt) {
    return document.querySelectorAll(`#grid-row${attempt} .letter-box`);
}

export function getKeyboardButtons() {
    return document.querySelectorAll('.key');
}

//const inputs = getInputsForRow(attempt); // Query for the first row

/*export function startNewLine() {
    console.log('Attempt:', attempt);

    // Get the new row (next attempt)
    const nextRowInputs = document.querySelectorAll(`#grid-row${attempt} .letter-box`);

    /* Clear the current input fields
    inputs.forEach(input => {
        input.textContent = ''; // Clear the current input field
        input.classList.remove('has-letter', 'flip'); // Remove classes like has-letter or flip
    });*/

    // Focus on the first letter box in the next row
    /*if (nextRowInputs.length > 0) {
        nextRowInputs[0].focus(); // Focus the first input of the next line
        console.log(`Focus moved to: grid-row${attempt} first box.`);
    } else {
        console.log('No more rows available!');
    }

    console.log(`Starting new line: Attempt ${attempt}`);
}*/

export function handleLetter(inputs, input, index) {
    setTimeout(() => {
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

export function handleBackspace(inputs, input, index) {
    // Handle backspace  
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

export function handleEnter(inputs, input, answerWord) {
    // Handle enter
    console.log('removing event listener');
    input.removeEventListener('keydown', input.handleKeydown); // Remove keydown listener
    input.removeEventListener('input', input.handleInput); // Remove input listener

    //attempt++;

    //if(attempt < 6) {
        //const nextInputs = getInputsForRow(attempt);
        //continueGame();
        //console.log('New Inputs:', nextInputs);
    //} else {
        //console.log('Game Over! You Lost');
    //}
    // Check that all 5 boxes are filled
    //if (inputs[4] === '') {
        //shakeWord();
        //showMessage('Not enough letters');
        //return; // Exit early
    //}
    
    // Check for winning word endgame
    console.log('Passed correctly: ', answerWord);
    checkWord(inputs, answerWord);

    // Mark letters and keyboard colors
    let { letterColors, keyColors } = checkLetters(inputs, answerWord);
    let usedKeys = [];
    // Track the letter being typed
    let inputLetter = input.textContent.trim().toUpperCase();
    if (inputLetter && !usedKeys.includes(inputLetter)) {
            usedKeys.push(inputLetter); // Add letter to used keys list
    }

    applyLetterColors(inputs, letterColors);  // Apply colors to tiles

    inputs.forEach((input, index) => {
        setTimeout(() => {
            input.style.animation = `flipLetter 0.6s ease-out forwards ${index * 100}ms`;
            // Flip letter box
            input.classList.add('flip');
        }, index * 100); // Flip animation timing
    });

    // Wait for flips to finish and then change keyboard colors
    setTimeout(() => {
        applyKeyboardColors(keys, keyColors); // Apply colors to keyboard
    }, inputs.length * 350);
}