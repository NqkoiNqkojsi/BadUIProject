const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = "";//TO DO make it the password
console.log(rightGuessString);


function AddChar(chr){
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter];
    let node = document.createTextNode(chr);
    box.appendChild(node);
    currentGuess.push(chr);
}
function DeleteChar(chr){
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter];
    box.children=null;
    currentGuess.reduce();
}
function NextLine(chr){
    //To Do color and shit
}
document.addEventListener("keyup", (e) => {
    let lastPressed=String(e.key);
    if(lastPressed=="Backspace" && nextLetter!==0){
        DeleteChar(lastPressed);
        nextLetter-=1;
        return;
    }
    if(lastPressed=="Enter" && nextLetter==NUMBER_OF_GUESSES){
        NextLine();
        nextLetter=0;
        guessesRemaining-=1;
        return;
    }
    if(nextLetter<NUMBER_OF_GUESSES){
        AddChar();
        nextLetter+=1;
        return;
    }
});

function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div");
        row.className = "letter-row";
        
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div");
            box.className = "letter-box";
            row.appendChild(box);
        }

        board.appendChild(row);
    }
}
initBoard();