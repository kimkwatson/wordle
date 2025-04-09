import { storeGuess, updateStatistics, getMessage, continueGame, nextLine, endGame } from "./gameProgression.mjs";

export function checkLetters(letters, answerWord) {
    let answerLetterCounts = {};
    let letterColors = new Map();
    let keyColors = new Map();
    console.log(answerWord);
    // Count occurrences of each letter in answerWord
    for (let letter of answerWord) {
        
        answerLetterCounts[letter] = (answerLetterCounts[letter] || 0) + 1;
    }

    // Mark correct letter (green)
    letters.forEach((letter, index) => {
        let letterText = letter.textContent.toUpperCase();

        if (letterText === answerWord[index]) {
            letterColors.set(letter, 'var(--green)');
            keyColors.set(letterText, 'var(--green)');
            answerLetterCounts[letterText]--; // Reduce count since it's correctly placed
        }
    });

    // Mark yellow (present but misplaced) and darkgray (not in word)
    letters.forEach((letter) => {
        let letterText = letter.textContent.toUpperCase();

        if (!letterColors.has(letter)) { // Skip already marked green
            if (answerWord.includes(letterText) && answerLetterCounts[letterText] > 0) {
                letterColors.set(letter, 'var(--yellow)'); // Partially correct
                keyColors.set(letterText, 'var(--yellow)');
                answerLetterCounts[letterText]--;
            } else {
                letterColors.set(letter, 'var(--darkgray)'); // Incorrect
                keyColors.set(letterText, 'var(--darkgray)');
            }
        }
    });

    return { letterColors, keyColors }; // Return both maps
}

export function applyLetterColors(letters, letterColors) {
    letters.forEach((letter) => {
        if (letterColors.has(letter)) {
            let color = letterColors.get(letter);
            letter.style.setProperty('--flip-color', color); // Use flip animation
            letter.classList.add('flip');
        }
    });
}

export function applyKeyboardColors(keys, keyColors) {
    keys.forEach((key) => {
        let keyText = key.textContent.toUpperCase();
        
        if (keyColors.has(keyText)) {
            key.style.backgroundColor = keyColors.get(keyText);
            key.style.color = 'white';
        }
    });
}

export function checkWord(letters, answerWord) {
    const guessWord = Array.from(letters).map(input => input.textContent.toUpperCase()).join('');

    if (!validWords.includes(guessWord)) {
        displayMessage('Not in word list');
    }
    
    if (guessWord === answerWord) {
        console.log('end game. you won.');

        // Get and display message
        setTimeout(() => {
            let message = getMessage();
            displayMessage(message);
        }, letters.length * 500);

        let didWin = true;
        // You won. End the Game
        endGame(didWin);
        
    } else {
        console.log('nope. not right.');
        storeGuess(guessWord);
        nextLine();
        continueGame();
    }
}

export function displayMessage(message) {
        let flag = document.querySelector('#message');
        flag.textContent = message;
        
        // Show message
        flag.style.visibility = 'visible';
        flag.classList.add('bounce');

        // Remove message
        setTimeout(() => {
            flag.style.visibility = 'hidden';
        }, 1500);
}
