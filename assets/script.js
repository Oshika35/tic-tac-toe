// Plan :
// - store the gameboard as an array inside of a Gameboard object
//     - create a html grid of 3x3 and link them to this function
//          - add an eventListener and link it to the player's team
//     - set the game rules
//          - set a cross and a circle team and link them to the players
//          - when a vertical, horizontal or crosswise set of the same team is present, triggers the win message for the corresponding team
//          - when there is no room left and the precedent condition hasn't been met, triggers the tie message
// - store players as an object
//          - create two objects to store each team and update their score
// - store the game flow as an object
//          - track each teams score
//          - according to the score, triggers the relevant condition in the gameboard function

const Gameboard = (() => {
    const getButtons = () => {
        const buttons = document.querySelectorAll('.ttt__game > div');
        buttons.forEach(button => console.log(button));
    }
    return {getButtons};
});

const GameRules = (() => {
    const winCondition = () => {
        
    }
})