const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const words = ["refrigerator", "swimmingpool", "wardrobe", "carpet", "television"];
let lives = 1;


// Create buttons per letter

let createButtons = () => {
    for (letter in alphabet) {
        let button = document.createElement("button");
        button.className = "buttons";
        button.id = letter;
        button.innerHTML = alphabet[letter];
        document.getElementById("letterButtons").appendChild(button)
    }
}
createButtons()

// Generate a random word from the list & create letter array of this word

let selectedWord = words[Math.floor(Math.random() * words.length)]
let selectedWordArray = selectedWord.split("")

// Create blanks for each letter in the word to be guessed

let letters = []
for (letter in selectedWord) {
    letters.push("_")
}
document.getElementById("guessedWord").innerHTML = letters.join("")

// GAME

let gameOn = () => {
    document.getElementById("lives").innerHTML = `Lives left: ${lives}`;
    // User selection of the letter
    const buttons = document.querySelectorAll(".buttons")
    for (let button of buttons) {
        button.addEventListener("click", () => {
            // If letter in word, substitute blank with letter
            if (selectedWord.indexOf(button.innerHTML) !== -1) {
                let clickedLetter = button.innerHTML.toString();
                for (let i=0; i<selectedWordArray.length; i++) {
                    if (selectedWordArray[i] === clickedLetter) {
                        letters[i] = clickedLetter
                        document.getElementById("guessedWord").innerHTML = letters.join("");
                        if (letters.includes("_") === false) {
                            document.getElementById("gameResult").innerHTML = "You win!";
                        }
                    }
                }
            }
            // If letter not in the word, deduct life
            else {
                lives -= 1
                document.getElementById("lives").innerHTML = `Lives left: ${lives}`;
                if (lives === 0) {
                    document.getElementById("gameResult").innerHTML = `game over.`;
                    document.getElementById("wordWas").innerHTML = `The word was: ${selectedWord}`;
                    document.getElementById("playAgain").style.visibility = "visible";
                    // document.getElementById("playAgain").addEventListener("click", () => {
                    //
                    // })
                }
            }
        }, {once: true})
        
    }
}

// TODO: if word guessed, disable buttons and show play again button
// TODO: if lives lost, disable buttons and show play again button
// TODO: make Play again button functional
// TODO: add count of lives saved and lives lost


gameOn()
