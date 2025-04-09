export function getWord() {
    return 'SPEND'; // Or replace with your API logic later
}

//let randomWord = '';

export async function getRandomWord() {
    const URL = "https://gist.githubusercontent.com/mrhead/f0ced2726394588e8d9863e0568b6473/raw/89e48277775f30e60ff60592d6e3d4acfe733e10/wordle.json";

    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        const randomIndex = Math.floor(Math.random() * json.length); // Get a random index
        const randomWord = json[randomIndex]; // Select the word at that index
        console.log("Random word selected:", randomWord);

        // Store the word in local storage (or pass it to another function)
        localStorage.setItem('randomWord', randomWord);

        return randomWord.toUpperCase();
    } catch (error) {
        console.error(error.message)
    }
}