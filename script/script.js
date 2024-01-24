//Tic Tac Toe

let box = document.querySelectorAll(".box");
let text = document.querySelector(".text");
let restartBtn = document.querySelector(".restart_button");
let winOptions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", "",];
let player = "X";
let running = false;
startGame()

function startGame() {
    text.textContent = `${player}'s Turn`
    restartBtn.addEventListener("click", restartGame);
    box.forEach(box => box.addEventListener("click", boxClick));
    running = true;
}

function boxClick() {
    let boxIndex = this.getAttribute("index");
    if (options[boxIndex] != "" || !running) {
        return;
    }
    boxValueChanger(this, boxIndex);
    winner();

}

function boxValueChanger(box, boxIndex) {
    options[boxIndex] = player;
    box.textContent = player;
}
function changePlayer() {
    player = (player == "X") ? "O" : "X";
    text.textContent = `${player}'s Turn`;
}

function winner() {
    let won = false;
    for (i = 0; i < winOptions.length; i++) {
        let option = winOptions[i];
        let lineA = options[option[0]]
        let lineB = options[option[1]]
        let lineC = options[option[2]]
        if (lineA == "" || lineB == "" || lineC == "") {
            continue;
        }
        if (lineA == lineB && lineB == lineC) {
            won = true;
            break;
        }
    }

    if (won) {
        text.textContent = `${player} won`;
        running = false;
    }
    else if (!options.includes("")) {
        text.textContent = "Draw";
        running = false;

    }
    else {
        changePlayer()
    }
}

function restartGame() {
    player = "X";
    options = ["", "", "", "", "", "", "", "", "",];
    text.textContent = `${player}'s Turn`;
    box.forEach(box => box.textContent = "");
    running = true;
}

//Calculator
