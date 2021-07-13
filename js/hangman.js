const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const words = ["refrigerator", "swimmingpool", "wardrobe", "carpet", "television", "cat", "dog", "home", "glass", "mouse"];
let lives = 7;


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

// GAME

let gameOn = () => {
    // document.getElementById("gameResult").style.visibility = "hidden";
    // document.getElementById("wordWas").style.visibility = "hidden";
    // document.getElementById("playAgain").style.visibility = "hidden";


    // Generate a random word from the list & create letter array of this word
    let selectedWord = words[Math.floor(Math.random() * words.length)]
    console.log(selectedWord)

    // Create blanks for each letter in the word to be guessed
    let letters = []
    for (letter in selectedWord) {letters.push("_")}
    document.getElementById("guessedWord").innerHTML = letters.join("")
    console.log(letters)

    // Keep count of lives left
    document.getElementById("lives").innerHTML = `Lives left: ${lives}`;

    // User selection of the letter
    const buttons = document.querySelectorAll(".buttons")
    for (let button of buttons) {
        button.addEventListener("click", () => {

            // If letter in word, substitute blank with letter
            if (selectedWord.indexOf(button.innerHTML) !== -1) {
                let clickedLetter = button.innerHTML.toString();
                for (let i=0; i<selectedWord.length; i++) {
                    if (selectedWord[i] === clickedLetter) {
                        letters[i] = clickedLetter
                        document.getElementById("guessedWord").innerHTML = letters.join("");
                        if (letters.includes("_") === false) {
                            document.getElementById("gameResult").style.visibility = "visible";
                            document.getElementById("gameResult").innerHTML = "You win!";
                            document.getElementById("playAgain").style.visibility = "visible";
                            document.getElementById("playAgain").addEventListener("click", () => {
                                window.location.reload()
                            })
                        }
                    }
                }
            }

            // If letter not in the word, deduct life
            else {
                lives -= 1
                document.getElementById("lives").innerHTML = `Lives left: ${lives}`;
                console.log(lives)
                document.getElementById("graphic").src = `../images/hangman-stage${lives}.png`
                console.log(`../images/hangman-stage${lives}.png`)
                if (lives === 0) {
                    document.getElementById("gameResult").style.visibility = `visible`;
                    document.getElementById("gameResult").innerHTML = `game over.`;
                    document.getElementById("wordWas").style.visibility = `visible`;
                    document.getElementById("wordWas").innerHTML = `The word was: ${selectedWord}`;
                    document.getElementById("playAgain").style.visibility = "visible";
                    document.getElementById("playAgain").addEventListener("click", () => {
                        window.location.reload()
                    })
                }
            }
        }, {once: true})
        
    }
}

// TODO: if word guessed or lives lost, disable buttons
// TODO: add count of lives saved and lives lost


gameOn()
