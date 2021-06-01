// variabile globale per contatore di secondi
let second = 0;
// variabile del set interval
let chronoInterval;

// array di bombe
let bomb = [];


function init() {
    listenForDifficultyChange();
    listenForSquareClick();
    listenForRefreshClick();
}

// funzione che fa stampare il le celle e le bombe in base alla difficolta scelta
function listenForDifficultyChange() {
    let currentDifficult;
    $("#difficulty").change(function () {
        currentDifficult = parseInt($(this).val());
        startNewGame(currentDifficult);
    });
    return currentDifficult;
}

function listenForSquareClick() {
    const score = $("#score");
    let counter = 0;

    $("#container-square").on("click", ".square-top", function () {
        let clickValue = parseInt(this.dataset.index);
        this.classList.add("none");
        //  se il dato index dell'elemento cliccato è incluso nell'array di bombe fine partita, altrimenti il counter si incrementa di 1
        if (bomb.includes(clickValue)) {
            console.log("sei esploso");
            $('.square-top').hide();
            $('.fa-bomb').show();
            clearInterval(chronoInterval);
            $('#game-over').show();
        } else {
            counter++;
        }

        // stampo punti nel display di destra
        if (counter < 10) {
            score.html("00" + counter);
        } else if (counter < 100) {
            score.html("0" + counter);
        } else {
            score.html(counter);
        }

        const clickableSquares = calculateSquaresNumber(listenForDifficultyChange()) - bomb.length; //valorizzo la const con il valore dei quadrati cliccabili senza bombe

        // nel momento in cui il valore dei quadrati cliccabili equivale al valore del counter hai vinto
        if (clickableSquares == counter) {
            console.log("hai vinto");
            clearInterval(chronoInterval);
            $('#win').show();
        }
    });
}

function listenForRefreshClick() {
    $("#refresh").click(function () {
        location.reload();
    });
}

function startNewGame(currentDifficult) {
    $("#score").html("000");
    $("#time").html("000");

    //square(currentDifficult);
    let squareNumber = calculateSquaresNumber(currentDifficult);
    //printSquare(square(currentDifficult));
    printSquare(squareNumber);
    //bombGenerate(square(currentDifficult));
    bombGenerate(squareNumber);
    if (chronoInterval != null) {
        clearInterval(chronoInterval);
    }
    chronoInterval = setInterval("chronometer()", 1000);
}

// funzione per ritornare il numero di celle in base alla difficoltà
function calculateSquaresNumber(value) {
    let square;

    if (value == 3) {
        square = 400;
    } else if (value == 2) {
        square = 225;
    } else {
        square = 81;
    }
    return square;
}

// funzione per generare i numeri bomba in base al numero di celle(quadrati)
function bombGenerate(square) {
    let div = document.getElementsByClassName("square-down");

    // const bomb = [];
    let bombNum;
    if (square == 81) {
        bombNum = 10;
    } else if (square == 225) {
        bombNum = 40;
    } else {
        bombNum = 120;
    }

    while (bomb.length < bombNum) {
        let rnd = Math.floor(Math.random() * square) + 1;
        if (!bomb.includes(rnd)) {
            bomb.push(rnd);
            div[rnd - 1].innerHTML += '<i class="fas fa-bomb"></i>';
        }
    }
}

function printSquare(square) {
    $("#container-square").html("");
    $("#container-square").removeClass();
    $("#container-game").removeClass();
    $("#info-game").removeClass("none");
    for (let i = 1; i <= square; i++) {
        createSquare(square, i);
    }
    // console.log(bomb);
}

// funzione per creare i quadrati
function createSquare(square, i) {
    const containerGame = $("#container-game");
    const containerSquare = $("#container-square");
    let divDown = document.createElement("div");
    divDown.classList.add("square-down");
    divDown.dataset.index = i;
    let divTop = document.createElement("div");
    divTop.classList.add("square-top");
    divTop.dataset.index = i;

    if (square == 400) {
        containerGame.addClass("container-game-hard");
        containerSquare.addClass("container-square-hard");
        divDown.classList.add("hard");
    } else if (square == 225) {
        containerGame.addClass("container-game-medium");
        containerSquare.addClass("container-square-medium");
        divDown.classList.add("medium");
    } else {
        containerGame.addClass("container-game-easy");
        containerSquare.addClass("container-square-easy");
        divDown.classList.add("easy");
    }

    divDown.append(divTop);
    containerSquare.append(divDown);
}

function chronometer() {
    if (second < 9) {
        second++;
        $("#time").html("00" + second);
    } else if (second < 99) {
        second++;
        $("#time").html("0" + second);
    } else {
        second++;
        $("#time").html(second);
    }
}


$(init);


