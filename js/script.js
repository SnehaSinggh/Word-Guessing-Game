const inp = document.querySelector(".inputs"),
hintTg = document.querySelector(".hint span"),
guessLft = document.querySelector(".guess-left span"),
wrongLtr = document.querySelector(".wrong-letter span"),
rstBtn = document.querySelector(".reset-btn"),
tpngInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrectLetters=[],correctLetters=[];

function rdmwd(){
    let ranItem = wordList[Math.floor(Math.random()* wordList.length)];
    word = ranItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = [];
    incorrectLetters = [];
    hintTg.innerText = ranItem.hint;
    guessLft.innerText = maxGuesses;
    wrongLtr.innerText = incorrectLetters;

    let html = "";
    for(let i=0 ;i < word.length; i++){
        html += '<input type ="text" disabled>';
        inp.innerHTML = html;
    }
}
rdmwd();
function initGame(e){
    let key = e.target.value.toLowerCase();
    if(key.match(/[A-Za-z]+$/) && !incorrectLetters.includes( ` ${key}`) && !correctLetters.includes(key) ){
        if(word.includes(key)){
            for(let i = 0; i < word.length; i++){
                if(word[i]== key){
                    correctLetters += key;
                    inp.querySelectorAll("input")[i].value = key;
                }
            }
        }
        else{
            maxGuesses--;
            incorrectLetters.push(` ${key}`);

        }
        guessLft.innerText = maxGuesses;
        wrongLtr.innerText = incorrectLetters;
    }
    tpngInput.value = "";

    setTimeout(() => {
        if(correctLetters.length === word.length){
            alert(' congrats');
            return rdmwd();
        }
        else if(maxGuesses < 1){
            alert('game over');
            for(let i = 0; i < word.length ; i++){
                inp.querySelectorAll("input")[i].value = word[i];
            }
        }
    } , 100);

}
rstBtn.addEventListener("click", rdmwd);
tpngInput.addEventListener("input", initGame);
inp.addEventListener("click", () => tpngInput.focus());
document.addEventListener("keydown", () => tpngInput.focus())