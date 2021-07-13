const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let lives = 7;

// Set count of wins and losses to 0 in the local storage on load of the window

window.onload = function () {
    if(typeof(Storage) !== "undefined") {
        if (!localStorage.soulsSaved) {
            localStorage.setItem("soulsSaved", 0);
        }
        if(!localStorage.soulsLost) {
            localStorage.setItem("soulsLost", 0);
        }
    }
}

// Create buttons per letter

let createButtons = () => {
    for (letter in alphabet) {
        let button = document.createElement("button");
        button.className = "buttons";
        button.id = letter;
        button.innerHTML = alphabet[letter];
        document.getElementById("letterButtons").appendChild(button);
    }
}
createButtons()

// Keep score in the local storage

const soulsSaved = () => {
    if(typeof(Storage) !== "undefined") {
        if(localStorage.soulsSaved) {
            localStorage.soulsSaved = Number(localStorage.soulsSaved) + 1;
        } else {
            localStorage.setItem("soulsSaved", 0);
        }
    }
}

const soulsLost = () => {
    if(typeof(Storage) !== "undefined") {
        if(localStorage.soulsLost) {
            localStorage.soulsLost = Number(localStorage.soulsLost) + 1;
        } else {
            localStorage.setItem("soulsLost", 0);
        }
    }
}

// Reset score in local storage

document.getElementById("reset").addEventListener("click", () => {
    localStorage.removeItem("soulsSaved");
    localStorage.removeItem("soulsLost");
    window.location.reload();
})

// Generate a random word


let easyWord = () => {
    fetch("https://random-word-form.herokuapp.com/random/noun")
        .then((response) => {
            return response.json();
        })
        .then ((easyWord) => {
            let selectedWord = easyWord[0];
            gameOn(selectedWord);
        })
}


// GAME

let gameOn = (selectedWord) => {

    // Create blanks for each letter in the word to be guessed
    let letters = [];
    console.log(selectedWord);
    for (let i=0; i<= selectedWord.length; i++) {
        if (selectedWord[i] === " ") {
            letters.push(" ")
        }
        else if (selectedWord[i] === "-") {
            letters.push("-")
        } else {
            letters.push("_")
        }
    }
    document.getElementById("guessedWord").innerHTML = letters.join("");

    // User selection of the letter
    const buttons = document.querySelectorAll(".buttons");
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
                            console.log(letters)
                            document.getElementById("gameResult").style.visibility = "visible";
                            document.getElementById("gameResult").innerHTML = "You win!";
                            document.getElementById("playAgain").style.visibility = "visible";
                            soulsSaved()
                            document.getElementById("soulsSaved").innerHTML = `Souls saved: ${localStorage.soulsSaved}`
                            document.getElementById("playAgainButton").addEventListener("click", () => {
                                window.location.reload();
                            })
                        }
                    }
                }
            }

            // If letter not in the word, deduct life
            else {
                if (lives >0) {
                    lives -= 1
                    console.log(lives)
                    document.getElementById("graphic").src = `../images/hangman-stage${lives}.png`;
                }
                else if (lives === 0) {
                    document.getElementById("gameResult").style.visibility = `visible`;
                    document.getElementById("gameResult").innerHTML = `game over.`;
                    document.getElementById("wordWas").style.visibility = `visible`;
                    document.getElementById("wordWas").innerHTML = `The word was: ${selectedWord}`;
                    document.getElementById("playAgain").style.visibility = "visible";
                    soulsLost()
                    document.getElementById("soulsLost").innerHTML = `Souls lost: ${localStorage.soulsLost}`
                    document.getElementById("playAgainButton").addEventListener("click", () => {
                        window.location.reload();
                    })
                }
            }
        }, {once: true})
        
    }
    document.getElementById("soulsSaved").innerHTML = `Souls saved: ${localStorage.soulsSaved}`;
    document.getElementById("soulsLost").innerHTML = `Souls lost: ${localStorage.soulsLost}`;
}

// TODO: still able to select letters after game over - need a fix
// TODO: if space or hyphen in word add it to the blanks as uncovered
// TODO: allow selection (easy, difficult, countries, capitals)


easyWord()
