const gameBoard = (() => {

    let gameArray = [
        [],
        [],
        []
    ];

    let turn = "x";

    const changeTurn = (value) => {
        turn = value;
    }

    function _listenerFunction() {
        console.log(this);
        switch(turn) {
            case "x":
                playerOne.playerAction(this);
                break;
            case "y":
                playerTwo.playerAction(this)
                break;
        }
        trackGame.trackConditions(gameArray);
        trackGame.trackTurn(turn);
    }

    const setEventListeners = () => {
        const squares = document.querySelectorAll('.ttt__game > div');
        squares.forEach(square => square.addEventListener('click', _listenerFunction));
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
    return { setEventListeners, pushSymbolToArray, changeTurn };
})();

const trackGame = (() => {
    const _setTurn = (turn) => {
        switch(turn) {
            case "x":
                gameBoard.changeTurn("y");
                break;
            case "y":
                gameBoard.changeTurn("x");
                break;
        }
    }

    const _setWinConditions = (gameArray) => {
        const x = 'x';
        const y = 'o';

        const crossWin =
            gameArray[0][0] === x && gameArray[0][1] === x && gameArray[0][2] === x ||
            gameArray[1][0] === x && gameArray[1][1] === x && gameArray[1][2] === x ||
            gameArray[2][0] === x && gameArray[2][1] === x && gameArray[2][2] === x ||
            gameArray[0][0] === x && gameArray[1][0] === x && gameArray[2][0] === x ||
            gameArray[0][1] === x && gameArray[1][1] === x && gameArray[2][1] === x ||
            gameArray[0][2] === x && gameArray[1][2] === x && gameArray[2][2] === x ||
            gameArray[0][0] === x && gameArray[1][1] === x && gameArray[2][2] === x ||
            gameArray[0][2] === x && gameArray[1][1] === x && gameArray[2][0] === x;

        const circleWin =
            gameArray[0][0] === y && gameArray[0][1] === y && gameArray[0][2] === y ||
            gameArray[1][0] === y && gameArray[1][1] === y && gameArray[1][2] === y ||
            gameArray[2][0] === y && gameArray[2][1] === y && gameArray[2][2] === y ||
            gameArray[0][0] === y && gameArray[1][0] === y && gameArray[2][0] === y ||
            gameArray[0][1] === y && gameArray[1][1] === y && gameArray[2][1] === y ||
            gameArray[0][2] === y && gameArray[1][2] === y && gameArray[2][2] === y ||
            gameArray[0][0] === y && gameArray[1][1] === y && gameArray[2][2] === y ||
            gameArray[0][2] === y && gameArray[1][1] === y && gameArray[2][0] === y;

        if (crossWin || circleWin) {
            const squares = document.querySelectorAll('.ttt__game > div');
            squares.forEach(square => square.style.pointerEvents = "none");
            if (crossWin) {
                alert("Cross team won");
            }
            else if (circleWin) {
                alert("Circle team won");
            }
        }
    }

    const trackTurn = (turn) => {
        _setTurn(turn);
    }

    const trackConditions = (gameArray) => {
        _setWinConditions(gameArray);
    }
    return { trackTurn, trackConditions };
})();

const Player = (symbol) => {
    const playerAction = (square) => {
        square.textContent = symbol;
        gameBoard.pushSymbolToArray(symbol, square);
        square.style.pointerEvents = "none";
    }
    return { playerAction };
}

const playerOne = Player('x');
const playerTwo = Player('o');



gameBoard.setEventListeners();