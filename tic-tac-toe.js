const gameboard = (() => {
    const gameboard = [["", "", ""], ["", "", ""], ["", "", ""]];
    const populate = () => {
        const htmlRows = document.querySelectorAll(".board-row");
        for (let row = 0; row < gameboard.length; row++) {
            let htmlRow = htmlRows[row];
            let htmlSquares = htmlRow.querySelectorAll(".board-square");
            for (let square = 0; square < gameboard[row].length; square++) {
                let htmlSquare = htmlSquares[square];
                let squareValue = htmlSquare.querySelector("h3"); 
                squareValue.textContent = gameboard[row][square];
            }
        }
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

    return {populate, clearBoard, checkForWin, update};
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
                    gameboard.populate();
                });
            }
        });
    }
    return {play};
}

const PlayGame = () => {
    const play = () => {
        gameboard.clearBoard();
        const playerOne = getPlayer("one");
        const playerTwo = getPlayer("two");
        let numTurns = 0;
        while (numTurns < 9) {
            playerOne.play("x");
            if (gameboard.checkForWin()) {
                //playerone wins popup
                break;
            }
            playerTwo.play("o");
            if (gameboard.checkForWin()) {
                //playertwo wins popup
                break;
            }
        }
    }

    const getPlayer = (playerNumber) => {
        const player = prompt("What is player " + playerNumber + "'s name?");
        return Player(player);
    }
    return {play};
}

gameboard.populate();
const game = PlayGame();
game.play();