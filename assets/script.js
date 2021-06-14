const gameBoard = (() => {

    let gameArray = [
        [],
        [],
        []
    ];

    const setEventListeners = (status) => {
        const squares = document.querySelectorAll('.ttt__game > div');
        squares.forEach(square => square.addEventListener('click', () => {
            // if () {
            playerOne.playerAction(square);
            // }
            // else if () {
            //      playerTwo.playerAction(square)
            // }
            trackGame.trackConditions(gameArray);
        }));
        if (status === 0) {
            squares.forEach(square => square.removeEventListener('click', () => {
            // if () {
            playerOne.playerAction(square);
            // }
            // else if () {
            //      playerTwo.playerAction(square)
            // }
            trackGame.trackConditions(gameArray);
            }));
        }
    }

    const pushSymbolToArray = (symbol, position) => {
        const gameBoard = document.querySelector('.ttt__game');
        const topLeft = gameBoard.querySelector('div:nth-child(1)');
        const topMiddle = gameBoard.querySelector('div:nth-child(2)');
        const topRight = gameBoard.querySelector('div:nth-child(3)');
        const middleLeft = gameBoard.querySelector('div:nth-child(4)');
        const middleMiddle = gameBoard.querySelector('div:nth-child(5)');
        const middleRight = gameBoard.querySelector('div:nth-child(6)');
        const bottomLeft = gameBoard.querySelector('div:nth-child(7)');
        const bottomMiddle = gameBoard.querySelector('div:nth-child(8)');
        const bottomRight = gameBoard.querySelector('div:nth-child(9)');


        switch (position) {
            case topLeft:
                gameArray[0][0] = symbol;
                break;
            case topMiddle:
                gameArray[0][1] = symbol;
                break;
            case topRight:
                gameArray[0][2] = symbol;
                break;
            case middleLeft:
                gameArray[1][0] = symbol;
                break;
            case middleMiddle:
                gameArray[1][1] = symbol;
                break;
            case middleRight:
                gameArray[1][2] = symbol;
                break;
            case bottomLeft:
                gameArray[2][0] = symbol;
                break;
            case bottomMiddle:
                gameArray[2][1] = symbol;
                break;
            case bottomRight:
                gameArray[2][2] = symbol;
                break;
        }
        console.log(gameArray);
    }
    return { setEventListeners, pushSymbolToArray };
})();

const trackGame = (() => {
    const _setWinConditions = (gameArray) => {
        const x = 'x';
        const y = 'o';
        const symbol = x || y;

        const horizontalWin =
            gameArray[0][0] && gameArray[0][1] && gameArray[0][2] === symbol ||
            gameArray[1][0] && gameArray[1][1] && gameArray[1][2] === symbol ||
            gameArray[2][0] && gameArray[2][1] && gameArray[2][2] === symbol;

        const verticalWin =
            gameArray[0][0] && gameArray[1][0] && gameArray[2][0] === symbol ||
            gameArray[0][1] && gameArray[1][1] && gameArray[2][1] === symbol ||
            gameArray[0][2] && gameArray[1][2] && gameArray[2][2] === symbol;

        const crosswiseWin =
            gameArray[0][0] && gameArray[1][1] && gameArray[2][2] === symbol ||
            gameArray[0][2] && gameArray[1][1] && gameArray[2][0] === symbol;

        if (horizontalWin || verticalWin || crosswiseWin) {
            console.log("you won");
            gameBoard.setEventListeners(0);
        }
    }

    const trackConditions = (gameArray) => {
        _setWinConditions(gameArray);
    }
    return { trackConditions };
})();

const Player = (symbol) => {
    const playerAction = (square) => {
        square.textContent = symbol;
        gameBoard.pushSymbolToArray(symbol, square);
    }
    return { playerAction };
}

const playerOne = Player('x');
const playerTwo = Player('o');



gameBoard.setEventListeners();