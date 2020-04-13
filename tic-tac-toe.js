const gameboard = (() => {
    const gameboard = [["", "", ""], ["", "", ""], ["", "", ""]];

    const getBoard = () => {
        return gameboard;
    }

    const update = (row, col, symbol) => {
        gameboard[row][col] = symbol;
    }

    const clearBoard = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                gameboard[row][col] = "";
            }
        }
    }

    const checkForWin = () => {
        for (let rowNum = 0; rowNum < 3; rowNum++) {
            let row = gameboard[rowNum];
            if ((row[0] != "") && (row[0] == row[1]) && (row[1] == row[2])) {
                return true;
            }
        }

        for (let col = 0; col < 3; col++) {
            if ((gameboard[0][col] != "") && (gameboard[0][col] == gameboard[1][col]) && (gameboard[1][col] == gameboard[2][col])) {
                return true;
            }
        }

        if ((gameboard[1][1] != "") && (
            ((gameboard[0][0] == gameboard[1][1]) && (gameboard[1][1] == gameboard[2][2])) ||
            ((gameboard[0][2] == gameboard[1][1]) && (gameboard[1][1] == gameboard[2][0])))) {
                return true;
            }

        return false;
    }

    return {getBoard, clearBoard, checkForWin, update};
})();

const Player = (name, symbol) => {
    this.name = name;
    this.symbol = symbol;
    return {name, symbol};
}

const PlayGame = () => {
    this.numTurns = 0;
    this.playerOne;
    this.playerTwo;
    this.currentPlayer;

    const play = () => {
        numTurns = 0;
        gameboard.clearBoard();
        currentPlayer = playerTwo;
        setClickListeners();
        nextTurn();
    }

    const startGame = () => {
        addPlayers();
    }

    const addPlayers = () => {
        if (typeof playerOne == "undefined") {
            playerOne = getPlayerInformation("one");
        } else if (typeof playerTwo == "undefined") {
            playerTwo = getPlayerInformation("two");
            displayController.hidePlayerPrompt();
            play();
        }
    }

    const nextTurn = () => {
        numTurns++;
        if (gameboard.checkForWin()) {
            console.log(currentPlayer);
        }
        if (numTurns > 9) {
            console.log("tie");
        }
        if (currentPlayer == playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
    }

    const setClickListeners = () => {
        const squares = document.querySelectorAll(".board-square");
        squares.forEach(square => {
            let squareValue = square.querySelector("h3").textContent;
            if (squareValue == "") {
                square.addEventListener("click", () => {fillPosition(square)}, {once: true});
            }
        });
    }
    
    const fillPosition = (square) => {
        let row = square.id.charAt(0);
        let col = square.id.charAt(1);
        if (currentPlayer == playerOne) {
            gameboard.update(row, col, playerOne.symbol);
        } else {
            gameboard.update(row, col, playerTwo.symbol);
        }
        displayController.displayGameboard();
        nextTurn();
    }

    const getPlayerInformation = (playerNumber) => {
        const name = document.querySelector("#player-name").value;
        console.log(document.querySelector('input[name="player-symbol"]'));
        const symbol = document.querySelector('input[name="player-symbol"]:checked').value;
        return Player(name, symbol);
    }
    return {startGame, addPlayers, play, nextTurn};
}

const displayController = (() => {
    const displayGameboard = () => {
        const board = gameboard.getBoard();
        const htmlRows = document.querySelectorAll(".board-row");
        for (let row = 0; row < board.length; row++) {
            let htmlRow = htmlRows[row];
            let htmlSquares = htmlRow.querySelectorAll(".board-square");
            for (let square = 0; square < board[row].length; square++) {
                let htmlSquare = htmlSquares[square];
                let squareValue = htmlSquare.querySelector("h3"); 
                squareValue.textContent = board[row][square];
            }
        }
    }

    const showPlayerPrompt = () => {
        const playerForm = document.querySelector(".player-information");
        playerForm.style.display = "flex";
    };

    const hidePlayerPrompt = () => {
        const playerForm = document.querySelector(".player-information");
        playerForm.style.display = "none";
    }

    return {displayGameboard, showPlayerPrompt, hidePlayerPrompt};
})();

const startButton = document.querySelector(".start-game");
startButton.addEventListener("click", () => {displayController.showPlayerPrompt()});
const submitPlayerInfo = document.querySelector(".submit-player");
displayController.displayGameboard();
const game = PlayGame();
submitPlayerInfo.addEventListener("click", () => {
    game.addPlayers();
    const nameInput = document.querySelector("#player-name");
    nameInput.value = "";
});
//game.startGame();