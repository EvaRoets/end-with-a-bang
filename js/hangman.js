const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let lives = 7;
let live = new Audio("../audio/live.wav")
let death = new Audio("../audio/death.wav")
let clickSound = new Audio("../audio/hint.wav")
let letterSound = new Audio("../audio/letter.wav")

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

document.getElementById("soulsSaved").innerHTML = `Souls saved: ${localStorage.soulsSaved}`;
document.getElementById("soulsLost").innerHTML = `Souls lost: ${localStorage.soulsLost}`;

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
    clickSound.play()
    localStorage.setItem("soulsSaved", 0);
    localStorage.setItem("soulsLost", 0);
    window.location.reload();
})

// Generate a random word based on the selected level

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

let difficultWord = () => {
    fetch("https://random-words-api.vercel.app/word")
        .then((response) => {
            return response.json();
        })
        .then((difficultWord) => {
            let selectedWord = difficultWord[0].word.toLowerCase();
            let hint = difficultWord[0].definition;
            gameOn(selectedWord, hint)
        })
}

let country = () => {
    fetch("https://restcountries.eu/rest/v2/all")
        .then((response) => {
            return response.json();
        })
        .then((country) => {
            let word = country[Math.floor(Math.random()*250)];
            let selectedWord = word.name.toLowerCase();
            let hint = word.subregion;
            gameOn(selectedWord, hint)
        })
}

let capital = () => {
    fetch("https://restcountries.eu/rest/v2/all")
        .then((response) => {
            return response.json();
        })
        .then((capital) => {
            let word = capital[Math.floor(Math.random()*250)];
            let selectedWord = word.capital.toLowerCase();
            let hint = word.name;
            gameOn(selectedWord, hint)
        })
}

const levels = document.querySelectorAll(".level");
for (let level of levels) {
    level.addEventListener("click", () => {
        clickSound.play()
        if (level.id === "easy") {
            document.getElementById("difficult").disabled = true;
            document.getElementById("countries").disabled = true;
            document.getElementById("capitals").disabled = true;
            document.getElementById("hintButton").disabled = true;
            easyWord();
        }
        else if (level.id === "difficult") {
            document.getElementById("easy").disabled = true;
            document.getElementById("countries").disabled = true;
            document.getElementById("capitals").disabled = true;
            difficultWord();
        }
        else if (level.id === "countries") {
            document.getElementById("difficult").disabled = true;
            document.getElementById("easy").disabled = true;
            document.getElementById("capitals").disabled = true;
            country();
        }
        else if (level.id === "capitals") {
            document.getElementById("difficult").disabled = true;
            document.getElementById("countries").disabled = true;
            document.getElementById("easy").disabled = true;
            capital();
        }
    }, {once: true})
}

// Back to home screen

document.getElementById("home").addEventListener("click", ()=> {
    clickSound.play()
})

// GAME

let gameOn = (selectedWord, hint) => {

    // Create blanks for each letter in the word to be guessed
    let letters = [];
    console.log(selectedWord);
    console.log(hint);
    for (let i=0; i< selectedWord.length; i++) {
        if (alphabet.includes(selectedWord[i])) {
            letters.push("_")
        }
        else {
           letters.push(selectedWord[i])
        }
    }
    document.getElementById("guessedWord").innerHTML = letters.join("");

    // Get a hint
    document.getElementById("hintButton").addEventListener("click", () => {
        clickSound.play()
        document.getElementById("hint").style.visibility = "visible";
        document.getElementById("hint").innerHTML = hint;
        console.log(hint)
        if (lives >0) {
            lives -= 1;
            document.getElementById("graphic").src = `../images/hangman-stage${lives}.png`;
        }
    }, {once: true})

    // User selection of the letter
    const buttons = document.querySelectorAll(".buttons");
    for (let button of buttons) {
        button.addEventListener("click", () => {
            letterSound.play()
            if (document.getElementById("gameResult").innerHTML === `game over`) {

            }
            else if

                // If letter in word, substitute blank with letter
                (selectedWord.indexOf(button.innerHTML) !== -1) {
                    let clickedLetter = button.innerHTML.toString();
                    for (let i = 0; i < selectedWord.length; i++) {
                        if (selectedWord[i] === clickedLetter) {
                            letters[i] = clickedLetter
                            document.getElementById("guessedWord").innerHTML = letters.join("");
                            if (letters.includes("_") === false) {
                                live.play()
                                document.getElementById("gameResult").style.visibility = "visible";
                                document.getElementById("gameResult").innerHTML = "You win!";
                                document.getElementById("playAgainButton").style.visibility = "visible";
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
                if (lives > 0 && document.getElementById("gameResult").innerHTML === ``) {
                    lives -= 1
                    console.log(lives)
                    document.getElementById("graphic").src = `../images/hangman-stage${lives}.png`;
                }
                else if (lives === 0) {
                    death.play();
                    document.getElementById("gameResult").style.visibility = `visible`;
                    document.getElementById("gameResult").innerHTML = `game over`;
                    document.getElementById("wordWas").style.visibility = `visible`;
                    document.getElementById("wordWas").innerHTML = `The word was: ${selectedWord}`;
                    document.getElementById("playAgainButton").style.visibility = "visible";
                    soulsLost()
                    document.getElementById("soulsLost").innerHTML = `Souls lost: ${localStorage.soulsLost}`
                    document.getElementById("playAgainButton").addEventListener("click", () => {
                        window.location.reload();
                    })
                }
            }
        }, {once: true})

    }
}

// TODO: check no of lives against graphics
// TODO: no sound for hint and backhome buttons


