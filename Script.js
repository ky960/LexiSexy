// Initial game setup
const targetWord = "breeze"; // The word players need to guess
const hints = ["Air", "Light", "Soft", "Gentle", "Flow"]; // Hints for each incorrect guess
let score = 100;
let revealedLetters = Array(targetWord.length).fill("_");
let remainingGuesses = 5; // Limit guesses to 5
let shownHints = []; // Array to store previous hints

// DOM Elements
const guessInput = document.getElementById("guessInput");
const feedback = document.getElementById("feedback");
const revealedWordElement = document.getElementById("revealedWord");
const scoreElement = document.getElementById("score");
const hintElement = document.getElementById("hint");

// Create a new element to display previous hints
const previousHintsElement = document.createElement("p");
previousHintsElement.id = "previousHints";
document.getElementById("game").appendChild(previousHintsElement); // Append below the game div

// Set up initial display
hintElement.innerText = `Hint: ${hints[0]}`; // Start with the first hint
revealedWordElement.innerText = revealedLetters.join(" ");
scoreElement.innerText = score;

// Handle guess submission
document.getElementById("submitGuess").addEventListener("click", () => {
    if (remainingGuesses > 0) {
        const guess = guessInput.value.toLowerCase();
        if (guess === targetWord) {
            feedback.innerText = "Correct! You've solved the word!";
            scoreElement.innerText = score;
        } else {
            // Move the current hint to the previous hints array
            let currentHint = hints[5 - remainingGuesses];
            if (!shownHints.includes(currentHint)) {
                shownHints.push(currentHint); // Add current hint to shown hints before updating
                updatePreviousHints(); // Update displayed previous hints
            }

            remainingGuesses -= 1; // Reduce guess count
            score -= 20; // Deduct points for each incorrect guess
            revealRandomLetter(); // Reveal a random letter after each incorrect guess
            feedback.innerText = `Try again! You have ${remainingGuesses} guesses left.`;
            scoreElement.innerText = score;

            // Update hint based on remaining guesses
            if (remainingGuesses > 0) {
                hintElement.innerText = `Hint: ${hints[5 - remainingGuesses]}`; // Update with the new current hint
            } else {
                hintElement.innerText = "Game over! No more guesses.";
            }
        }
    } else {
        feedback.innerText = "Game over! You've used all your guesses.";
    }
    guessInput.value = ""; // Clear input
});

// Function to reveal a random letter from the target word
function revealRandomLetter() {
    let unrevealedIndices = [];

    // Find indices of unrevealed letters
    for (let i = 0; i < targetWord.length; i++) {
        if (revealedLetters[i] === "_") {
            unrevealedIndices.push(i);
        }
    }

    // If there are unrevealed letters left, reveal one at random
    if (unrevealedIndices.length > 0) {
        let randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
        revealedLetters[randomIndex] = targetWord[randomIndex];
    }

    // Update the displayed word with the newly revealed letter
    revealedWordElement.innerText = revealedLetters.join(" ");
}

// Function to update and display previous hints
function updatePreviousHints() {
    previousHintsElement.innerText = `Previous Hints: ${shownHints.join(", ")}`;
}