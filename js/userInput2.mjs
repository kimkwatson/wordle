import { checkWord, checkLetters, applyLetterColors, applyKeyboardColors } from "./feedback.mjs";

const keys = document.querySelectorAll('.key');

export function getInputsForRow(attempt) {
    return document.querySelectorAll(`#grid-row${attempt} .letter-box`);
}

export function getKeyboardButtons() {
    return document.querySelectorAll('.key');
}

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
    // Remove event listeners
    input.removeEventListener('keydown', input.handleKeydown); // Remove keydown listener
    input.removeEventListener('input', input.handleInput); // Remove input listener
    
    // Check for winning word endgame
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