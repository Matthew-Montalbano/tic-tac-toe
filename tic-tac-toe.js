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
            let row = gameboard[rowNum]
            if ((row[0] == row[1]) && (row[1] == row[2])) {
                return true;
            }
        }

        for (let col = 0; col < 3; col++) {
            if ((gameboard[0][col] == gameboard[1][col]) && (gameboard[1][col] == gameboard[2][col])) {
                return true;
            }
        }

        if (((gameboard[0][0] == gameboard[1][1]) && (gameboard[1][1] == gameboard[2][2])) ||
            ((gameboard[0][2] == gameboard[1][1]) && (gameboard[1][1] == gameboard[2][0]))) {
                return true;
            }

        return false;
    }

    return {getBoard, clearBoard, checkForWin, update};
})();

const Player = (name) => {
    this.name = name;
    const play = (symbol) => {
        const squares = document.querySelectorAll(".board-square");
        squares.forEach(square => {
            let squareValue = square.querySelector("h3").textContent;
            if (squareValue == "") {
                square.addEventListener("click", () => {
                    let row = square.id.charAt(0);
                    let col = square.id.charAt(1);
                    gameboard.update(row, col, symbol);
                    displayController.displayGameboard();
                    game.nextTurn();
                });
            }
        });
    }
    return {play};
}

const PlayGame = () => {
    this.numTurns = 0;
    this.playerOne;
    this.playerTwo;

    const play = () => {
        numTurns = 0;
        gameboard.clearBoard();
        playerOne = getPlayer("one");
        playerTwo = getPlayer("two");
        nextTurn();
    }

    const nextTurn = () => {
        if (numTurns >= 9) {
            //tie
        } else if (numTurns % 2 == 0) {
            playerOne.play("x");
        } else {
            playerTwo.play("o");
        }
        numTurns++;
    }

    const getPlayer = (playerNumber) => {
        const player = prompt("What is player " + playerNumber + "'s name?");
        return Player(player);
    }
    return {play, nextTurn};
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

    const ShowPlayerPrompt = () => {
        return;
    };

    return {displayGameboard, ShowPlayerPrompt};
})();

displayController.displayGameboard();
const game = PlayGame();
game.play();