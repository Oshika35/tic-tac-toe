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

    const _listenerFunction = (square) => {
        console.log(square);
        switch(turn) {
            case "x":
                playerOne.playerAction(square);
                break;
            case "o":
                playerTwo.playerAction(square)
                break;
        }
        trackGame.trackConditions(gameArray);
        trackGame.trackTurn(turn);
    }

    const setEventListeners = () => {
        const squares = document.querySelectorAll('.ttt__game > div');
        squares.forEach(square => square.addEventListener('click', _listenerFunction.bind(null, square)));
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
    }
    return { setEventListeners, pushSymbolToArray, changeTurn };
})();

const trackGame = (() => {
    const _setTurn = (turn) => {
        switch(turn) {
            case "x":
                gameBoard.changeTurn("o");
                break;
            case "o":
                gameBoard.changeTurn("x");
                break;
        }
    }

    const _winPattern = (gameArray, symbol) => {
        return gameArray[0][0] === symbol && gameArray[0][1] === symbol && gameArray[0][2] === symbol ||
               gameArray[1][0] === symbol && gameArray[1][1] === symbol && gameArray[1][2] === symbol ||
               gameArray[2][0] === symbol && gameArray[2][1] === symbol && gameArray[2][2] === symbol ||
               gameArray[0][0] === symbol && gameArray[1][0] === symbol && gameArray[2][0] === symbol ||
               gameArray[0][1] === symbol && gameArray[1][1] === symbol && gameArray[2][1] === symbol ||
               gameArray[0][2] === symbol && gameArray[1][2] === symbol && gameArray[2][2] === symbol ||
               gameArray[0][0] === symbol && gameArray[1][1] === symbol && gameArray[2][2] === symbol ||
               gameArray[0][2] === symbol && gameArray[1][1] === symbol && gameArray[2][0] === symbol;
    }

    const _setWinConditions = (gameArray) => {
        const x = 'x';
        const o = 'o';
        const crossWin = _winPattern(gameArray, x);
        const circleWin = _winPattern(gameArray, o);
        console.log(crossWin);

        if (crossWin || circleWin) {
            const squares = document.querySelectorAll('.ttt__game > div');
            squares.forEach(square => square.style.pointerEvents = "none");
            if (crossWin) {
                console.log("Cross team won");
            }
            else if (circleWin) {
                console.log("Circle team won");
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