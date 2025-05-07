// Global Variable
let evasive;
let coyote = 20;
let wolf = 20;


// Dice Roll Function
function diceRoll() {
    return Math.floor(Math.random() * 6 + 1);
}

function setEvasiveNumber() {
    const evasiveNumber = diceRoll();
    const button = document.getElementById('evasiveButton');
    button.textContent = `Evasive #: ${evasiveNumber}`;
    evasive = evasiveNumber; // Set the Global Variable
    return evasiveNumber;
}

// Button Click Logic To Start Game
document.getElementById('evasiveButton').addEventListener('click', ()=> {
    if (!evasive && coyote === 20 && wolf === 20) { // Only Set Evasive Number and Start Game Once
        setEvasiveNumber();
        gameMessage.textContent = 'Let the Game Begin!'
        gameMessage.style.color = 'white';
    }else if(coyote === 0 || wolf === 0){
        gameMessage.textContent = 'The Game is Over, Please Reset'
        gameMessage.style.color = 'red';
    } else {
        gameMessage.textContent = 'Game in Progress';
        gameMessage.style.color = 'orange';
        console.log('The game has begun!');
    }
});


function resetGame() {
    const wolfPoints = document.getElementById('wolfPoints')
    const coyotePoints = document.getElementById('coyotePoints');
    const wolfRoll = document.getElementById('wolfRoll');
    const coyoteRoll = document.getElementById('coyoteRoll');
    const roundWinner = document.getElementById('roundWinner');
    const evadeButton = document.getElementById('evasiveButton');
    const gameMessage = document.getElementById('gameMessage');
    
    wolfPoints.textContent = '20';
    coyotePoints.textContent = '20';
    
    wolfRoll.textContent = '3';
    coyoteRoll.textContent = '3';

    roundWinner.textContent = "Who Will Win? Let's Play!";
    evadeButton.textContent = 'Evasive #:';
    gameMessage.textContent = '';

    wolf = 20;
    coyote = 20;
    evasive = null;
}

document.getElementById('resetButton').addEventListener('click', ()=> {
    resetGame();
})


// Game Logic
function coyoteVsWolf() {
        const roundWinner = document.getElementById('roundWinner');
        const wolfPoints = document.getElementById('wolfPoints');
        const coyotePoints = document.getElementById('coyotePoints');
        const wolfRolled = document.getElementById('wolfRoll');
        const coyoteRolled = document.getElementById('coyoteRoll');

        const wolfRoll = diceRoll();
        const coyoteRoll = diceRoll();

        console.log(`The wolf rolled a ${wolfRoll}`);
        console.log(`The coyote rolled a ${coyoteRoll}`);

        if (wolfRoll === 6) {
            coyote -= 2;
            if(coyote < 0) coyote = 0;
            console.log('Wolf lands a critical hit!')
            roundWinner.textContent = 'Wolf Lands Critical Hit!';
        } else if(evasive === 6 && coyoteRoll === 6) {
            if(wolf > 0)
            wolf--;
                console.log('The coyote wins this round with high-score evasive!')
                roundWinner.textContent = 'Coyote Uses High-Score Evasive!';
        } else if (evasive === coyoteRoll) {
            console.log('Coyote evades this round, no points lost for either.')
            roundWinner.textContent = 'Coyote Evades, Nobody Loses Points';
        } else {
            if(wolfRoll > coyoteRoll) {
                if(coyote > 0)
                coyote--;
                console.log('The wolf wins this round!')
                roundWinner.textContent = 'Wolf Wins Round!';
            } else if(wolfRoll < coyoteRoll) {
                wolf--;
                console.log('The coyote wins this round!')
                roundWinner.textContent = 'Coyote Wins Round!';
            } else {
                console.log('There has been a tie!');
                roundWinner.textContent = 'A Tie!';
            }
        }

    console.log(`Wolf Score: ${wolf}`);
    console.log(`Coyote Score: ${coyote}`);

    wolfPoints.textContent = `${wolf}`;
    coyotePoints.textContent = `${coyote}`;
    wolfRolled.textContent = `${wolfRoll}`;
    coyoteRolled.textContent = `${coyoteRoll}`;

    if(wolf <= 0 && coyote <= 0) {
        roundWinner.textContent = "It's a Draw!";
    } else if (wolf <= 0) {
        roundWinner.textContent = 'Coyote Declares Victory!';
        console.log('Coyote Declares Victory!');
        return;
    } else if(coyote <= 0) {
        roundWinner.textContent = 'Wolf Declares Victory!';
        console.log('Wolf Declares Victory!');
        return;
    }

}

document.getElementById('rollDice').addEventListener('click', () => {

    const gameMessage = document.getElementById('gameMessage');

    if(wolf > 0 && coyote > 0) {
        coyoteVsWolf()
        gameMessage.textContent = '';
    } else {
        console.log('Please Reset To Play Again!');
        gameMessage.textContent = 'Reset Game To Play Again';
        gameMessage.style.color = 'red';
    }
})