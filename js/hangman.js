const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const words = ["cat", "dog", "pig", "cow"];
let lives = 7;

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
        document.getElementById("letterButtons").appendChild(button)
    }
}
createButtons()

// Keep score

// localStorage.setItem("livesSaved", 0);
// localStorage.setItem("livesLost", 0);

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

const resetScore = () => {
    localStorage.removeItem("soulsSaved");
    localStorage.removeItem("soulsLost");
}

document.getElementById("reset").addEventListener("click", () => {
    resetScore()
    window.location.reload()
})

// Generate a random word


let easyWord = () => {
    fetch("https://random-word-form.herokuapp.com/random/noun")
        .then((response) => {
            return response.json()
        })
        .then ((easyWord) => {
            let selectedWord = easyWord[0];
            console.log(selectedWord);
            gameOn(selectedWord);
        })
}


// GAME

let gameOn = (selectedWord) => {
    // livesSaved()
    // livesLost()
    // Generate a random word from the list & create letter array of this word
    // let selectedWord = words[Math.floor(Math.random() * words.length)]

    // Create blanks for each letter in the word to be guessed
    let letters = []
    console.log(selectedWord)
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
                            console.log(letters)
                            document.getElementById("gameResult").style.visibility = "visible";
                            document.getElementById("gameResult").innerHTML = "You win!";
                            document.getElementById("playAgain").style.visibility = "visible";
                            soulsSaved()
                            document.getElementById("soulsSaved").innerHTML = `Souls saved: ${localStorage.soulsSaved}`
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
                    console.log(lives)
                    document.getElementById("gameResult").style.visibility = `visible`;
                    document.getElementById("gameResult").innerHTML = `game over.`;
                    document.getElementById("wordWas").style.visibility = `visible`;
                    document.getElementById("wordWas").innerHTML = `The word was: ${selectedWord}`;
                    document.getElementById("playAgain").style.visibility = "visible";
                    soulsLost()
                    document.getElementById("soulsLost").innerHTML = `Souls lost: ${localStorage.soulsLost}`
                    document.getElementById("playAgain").addEventListener("click", () => {
                        window.location.reload()
                    })
                }
            }
        }, {once: true})
        
    }
    document.getElementById("soulsSaved").innerHTML = `Souls saved: ${localStorage.soulsSaved}`
    document.getElementById("soulsLost").innerHTML = `Souls lost: ${localStorage.soulsLost}`

}

// TODO: add count of lives saved and lives lost
// TODO: link to API
// TODO: allow selection (easy, difficult, countries, capitals)


easyWord()
