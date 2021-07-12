const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const words = ["refrigerator", "swimmingpool", "wardrobe", "carpet", "television"];

// Create buttons per letter

for (letter in alphabet) {
    let button = document.createElement("button");
    button.className = "buttons";
    button.id = letter;
    button.innerHTML = alphabet[letter];
    document.getElementById("letterButtons").appendChild(button)
}

// Generate a random word from the list

let selectedWord = words[Math.floor(Math.random() * words.length)]
let selectedWordArray = selectedWord.split("")
console.log(selectedWordArray)

// Create blanks for word to be guessed

let letters = []
for (letter in selectedWord) {
    letters.push("_ ")
}
document.getElementById("guessedWord").innerHTML = letters.join("")
console.log(selectedWord)

// User selection of the letter

const buttons = document.querySelectorAll(".buttons")
for (const button of buttons) {
    button.addEventListener("click", () => {
        if (selectedWord.indexOf(button.innerHTML) !== -1) {
            let clickedLetter = button.innerHTML.toString();
            // console.log(clickedLetter)
            index(clickedLetter)
        }
    })
}

// Find indexes of the letter in the selectedWord

let index = clickedLetter => {
    let indexes = [];
    for (let i = 0; i <= selectedWordArray.length; i++) {
        if (selectedWordArray[i] === clickedLetter.toString()) {
            console.log(selectedWordArray[i])
            indexes.push(i)
        }
        else {

        }
    }
    // for (item in indexes) {
    //     let insertLetter = document.getElementById("guessedWord").innerHTML
    //     document.getElementById("guessedWord").innerHTML = insertLetter[index[item]].replace("_ ", clickedLetter)
    //     // letters[item] = clickedLetter
    // }
    console.log(indexes)
}

// Replace blank with the letter

