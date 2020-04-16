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
    numTurns = 0;
    playerOne = null;
    playerTwo = null;
    currentPlayer = null;

    const startGame = () => {
        gameboard.clearBoard();
        displayController.showPlayerPrompt("One");
        displayController.displayGameboard();
        const submitPlayerInfo = document.querySelector(".submit-player");
        submitPlayerInfo.addEventListener("click", addPlayers);
    }

    const addPlayers = () => {
        if (playerOne == null) {
            playerOne = getPlayerInformation();
            displayController.clearPlayerPrompt();
            displayController.showPlayerPrompt("Two");
        } else if (playerTwo == null) {
            playerTwo = getPlayerInformation();
            displayController.hidePlayerPrompt();
            displayController.clearPlayerPrompt();
            document.querySelector(".submit-player").removeEventListener("click", addPlayers);
            play();
        }
    }

    const getPlayerInformation = () => {
        const name = document.querySelector("#player-name").value;
        const symbol = document.querySelector('input[name="player-symbol"]:checked').value;
        return Player(name, symbol);
    }

    const play = () => {
        currentPlayer = playerTwo;
        setClickListeners();
        nextTurn();
    }

    const setClickListeners = () => {
        const squares = document.querySelectorAll(".board-square");
        squares.forEach(square => {
            square.addEventListener("click", fillPosition, {once: true});
        });
    }

    const fillPosition = (event) => {
        const squareID = event.target.id;
        let row = squareID.charAt(0);
        let col = squareID.charAt(1);
        gameboard.update(row, col, currentPlayer.symbol);
        displayController.displayGameboard();
        nextTurn();
    }

    const nextTurn = () => {
        numTurns++;
        if (gameboard.checkForWin()) {
            removeClickListeners();
            displayController.displayWinner(currentPlayer);
            return;
        }
        if (numTurns > 9) {
            removeClickListeners();
            displayController.displayTie();
            return;
        }
        if (currentPlayer == playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
        displayController.displayCurrentPlayer(currentPlayer);
    }

    const removeClickListeners = () => {
        const squares = document.querySelectorAll(".board-square");
        squares.forEach(square => {
            console.log('a');
            square.removeEventListener("click", fillPosition);
        });
    }

    return {startGame};
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

    const showPlayerPrompt = (playerNumber) => {
        const playerForm = document.querySelector(".player-information");
        playerForm.querySelector("h2").textContent = "Player " + playerNumber + "'s Info";
        playerForm.style.display = "flex";
    };

    const hidePlayerPrompt = () => {
        const playerForm = document.querySelector(".player-information");
        playerForm.style.display = "none";
    }

    const clearPlayerPrompt = () => {
        const nameInput = document.querySelector("#player-name");
        nameInput.value = "";
    }

    const displayCurrentPlayer = (player) => {
        const currentPlayerText = document.querySelector(".text-display");
        currentPlayerText.textContent = player.name + "'s Turn";
    }

    const displayWinner = (player) => {
        const textDisplay = document.querySelector(".text-display");
        textDisplay.textContent = player.name + " Wins!!!";
    }

    const displayTie = () => {
        const textDisplay = document.querySelector(".text-display");
        textDisplay.textContent = "The game is a tie!";
    }

    return {displayGameboard, showPlayerPrompt, hidePlayerPrompt, clearPlayerPrompt, displayCurrentPlayer, displayWinner, displayTie};
})();



const buildPage = () => {
    const startButton = document.querySelector(".start-game");
    startButton.addEventListener("click", () => {
        game = PlayGame();
        game.startGame();
    });
}


buildPage();