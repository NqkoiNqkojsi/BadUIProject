const NUMBER_OF_GUESSES = 6;
const NUMBER_OF_LETTERS=8;
let isEnded=false;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = ["p","a","s","s","w","o","r","d"];//TO DO make it the password
console.log(rightGuessString);
function CheckFullyCorrect(chr){
    return chr =="c";
}
 
function DisplayEnd(isWin){
    let callout=document.getElementById("callout");
    callout.style.display="inline";
    let txt=document.getElementById("callout-text");
    if(isWin){
        txt.innerHTML="you got the correct password";
        return;
    }
    txt.innerHTML="wrong password";
    return;
}
 
function GuessResult(){
    let checkWord=rightGuessString.slice();
    let mapGuess=Array();
    console.log(checkWord);
    console.log(currentGuess);
    //first check for fully right
    for(let i=0;i<NUMBER_OF_LETTERS;i++){
        if(checkWord[i]==currentGuess[i]){
            mapGuess.push("c");
            checkWord[i]="#";
            currentGuess[i]="#";
        }else{
            mapGuess.push("w");
        }
    }
    if(mapGuess.every(CheckFullyCorrect)){
        isEnded=true;
        DisplayEnd(true);
        return mapGuess;
    }
    //second check for partial right
    for(let indx in checkWord){
        let x=checkWord[indx];//dont know what Im doing wrong here, but its sketchy
        if(x!="#"){
            for(let i=0;i<NUMBER_OF_LETTERS;i++){
                if(currentGuess[i]==x){
                    currentGuess[i]="#";
                    mapGuess[i]="p";
                    continue;
                }
            }
        }
        checkWord[indx]="#";
    }
    for(let indx in checkWord){
        let x=checkWord[indx];//dont know what Im doing wrong here, but its sketchy
        if(x!="#"){
            for(let i=0;i<NUMBER_OF_LETTERS;i++){
                if(currentGuess[i].toLowerCase()==x.toLowerCase()){
                    currentGuess[i]="#";
                    mapGuess[i]="s";
                    continue;
                }
            }
        }
        checkWord[indx]="#";
    }
    currentGuess=[];
    return mapGuess;
}
function AddChar(chr){
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter];
    const para = document.createElement("p");
    let node = document.createTextNode(chr);
    para.appendChild(node);
    box.appendChild(para);
    box.setAttribute("class", "filled-box");
    if(nextLetter<NUMBER_OF_LETTERS-1){
        let boxNext = row.children[nextLetter+1];
        boxNext.setAttribute("class", "writting-box");
    }
    currentGuess.push(chr);
}
function DeleteChar(){
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter-1];
    box.childNodes.forEach(element => {
        element.remove();
    });
    box.setAttribute("class", "writting-box");
    if(nextLetter<NUMBER_OF_LETTERS){
        let boxNext = row.children[nextLetter];
        boxNext.setAttribute("class", "letter-box");
    }
    currentGuess.pop();
}
function NextLine(chr){
    //To Do color and shit
    let mapGuess=GuessResult();
    for(let i=0;i<NUMBER_OF_LETTERS;i++){
        let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
        let box = row.children[i];
        switch(mapGuess[i]){
            case "c":box.setAttribute("class","right-box");break;
            case "p":box.setAttribute("class","partial-box");break;
            case "s":box.setAttribute("class","caps-box");break;
            case "w":box.setAttribute("class","wrong-box");break;
        }
    }
}
document.addEventListener("keyup", (e) => {
    if(isEnded==false){
        let lastPressed=String(e.key);
        if(lastPressed=="Shift" || lastPressed=="CapsLock" || lastPressed=="#"){
            return;
        }
        if(lastPressed=="Backspace"){
            if(nextLetter!==0){
                DeleteChar();
                nextLetter-=1;
            }
            return;
        }else if(lastPressed=="Enter"){
            if(nextLetter==NUMBER_OF_LETTERS){
                NextLine(lastPressed);
                nextLetter=0;
                guessesRemaining-=1;
                if(guessesRemaining==0){
                    isEnded=true;
                    DisplayEnd(false);
                }
            }
            return;
        }else if(nextLetter<NUMBER_OF_LETTERS){
            AddChar(lastPressed);
            nextLetter+=1;
            return;
        }
    }
});
 
function initBoard() {
    let board = document.getElementById("game-board");
 
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div");
        row.className = "letter-row";
 
        for (let j = 0; j < NUMBER_OF_LETTERS; j++) {
            let box = document.createElement("div");
            box.className = "letter-box";
            row.appendChild(box);
        }
 
        board.appendChild(row);
    }
}
initBoard();