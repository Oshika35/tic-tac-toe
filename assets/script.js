const teamSelection = (() => {
    const modal = document.querySelector(".container__selection");

    const selectTeam = () => {
        const teamX = modal.querySelector(".team__x");
        const teamO = modal.querySelector(".team__o");

        teamX.addEventListener('click', () => {
            modal.classList.add("hidden");
            gameBoard.changeTurn("x");
        });
        teamO.addEventListener('click', () => {
            modal.classList.add("hidden");
            gameBoard.changeTurn("o");
        });
    }

    const reset = () => {
        modal.classList.remove("hidden");
    }

    return { selectTeam, reset };
})();

const gameBoard = (() => {

    let gameArray = [
        [],
        [],
        []
    ];

    let turn = "x";

    const squares = document.querySelectorAll('.ttt__game > div');

    const changeTurn = (value) => {
        const xTurn = document.querySelector(".turn__x");
        const oTurn = document.querySelector(".turn__o");

        turn = value;
        switch (value) {
            case "x":
                xTurn.style.color = "rgba(255, 255, 255)";
                oTurn.style.color = "rgba(255, 255, 255, 0.3)";
                break;
            case "o":
                xTurn.style.color = "rgba(255, 255, 255, 0.3)";
                oTurn.style.color = "rgba(255, 255, 255)";
                break;
        }
    }

    const _listenerFunction = (square) => {
        switch (turn) {
            case "x":
                playerOne.playerAction(square);
                break;
            case "o":
                playerTwo.playerAction(square)
                break;
        }
        trackGame.trackTurn(turn);
        trackGame.trackConditions(gameArray);
    }

    const setEventListeners = () => {
        teamSelection.selectTeam();
        gameBoard.reset();
        squares.forEach(square => square.addEventListener('click', _listenerFunction.bind(null, square)));
    }

    const reset = () => {
        const buttons = document.querySelectorAll(".reset__button");
        buttons.forEach(button => button.addEventListener('click', () => {
            gameArray = [
                [],
                [],
                []
            ];
            squares.forEach(square => {
                square.textContent = '';
                square.removeAttribute("style");
            });
            turn = "x";
            teamSelection.reset();
            trackGame.reset();
        }));
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
    return { setEventListeners, pushSymbolToArray, changeTurn, reset };
})();

const trackGame = (() => {
    const xTurn = document.querySelector(".turn__x");
    const oTurn = document.querySelector(".turn__o");
    const modal = document.querySelector(".modal__win");
    const message = modal.querySelector(".container__message");

    const _setTurn = (turn) => {
        switch (turn) {
            case "x":
                gameBoard.changeTurn("o");
                xTurn.style.color = "rgba(255, 255, 255, 0.3)"
                oTurn.style.color = "rgba(255, 255, 255)"
                break;
            case "o":
                gameBoard.changeTurn("x");
                xTurn.style.color = "rgba(255, 255, 255)"
                oTurn.style.color = "rgba(255, 255, 255, 0.3)"
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

        if (crossWin || circleWin) {
            const squares = document.querySelectorAll('.ttt__game > div');
            squares.forEach(square => square.style.pointerEvents = "none");
            oTurn.style.color = "rgba(255, 255, 255, 0.3)";
            xTurn.style.color = "rgba(255, 255, 255, 0.3)";
            modal.style.display = "flex";
            if (crossWin) {
                message.textContent = "X WON!";
            }
            else if (circleWin) {
                message.textContent = "O WON!";
            }
        }
    }

    const _setTieConditions = (gameArray) => {
        const tie =
        gameArray[0].length === 3 &&
        gameArray[1].length === 3 &&
        gameArray[2].length === 3;

        if (tie) {
            modal.style.display = "flex";
            message.textContent = "TIE!";
        }
    }

    const reset = () => {
        modal.style.display = "none";
    }

    const trackTurn = (turn) => {
        _setTurn(turn);
    }

    const trackConditions = (gameArray) => {
        _setWinConditions(gameArray);
        _setTieConditions(gameArray);
    }

    return { trackTurn, trackConditions, reset };
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