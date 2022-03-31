var scores, roundScore, activePlayer, gamePlaying;

initialize();

var lastDice;

/************* Roll Dice Button Event Listener/functionality *************/

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    // 1. Need Random Number as soon as someone hits the button
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result in Dice (image)
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';

    document.getElementById('dice-1').src = 'images/Dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'images/Dice-' + dice2 + '.png';

    /******** CASE: THE TWO DICE -  ********/
    // 3. Update the round score if the rolled number was not 1

    if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore = roundScore + dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent =
        roundScore;
    } else {
      // Next player
      nextPlayer();
    }

    // Adding sound to the button
    var diceSound = new Audio('audio/diceRollSound.mp3');
    diceSound.play();
  }
});

/************* Hold Button Event Listener/functionality *************/

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // 1. Add current score to global score
    scores[activePlayer] += roundScore;

    // 2. Update the UI
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    // Read final score value from the user
    var input = document.querySelector('.final-score').value;
    var winningScore;

    // Undefined, 0, null or "" are coerced to false
    // Anything else is coerced to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100; //Default winning score
    }

    // 3. Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';

      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');

      gamePlaying = false;

      var winningSound = new Audio('audio/TaDa.mp3');
      winningSound.play();
    } else {
      // Next player
      nextPlayer();
    }

    var holdButtonSound = new Audio('audio/Toggle.mp3');
    holdButtonSound.play();
  }
});

// DRY function

function nextPlayer() {
  // Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

/************* New Game Button Event Listener/functionality *************/

document.querySelector('.btn-new').addEventListener('click', initialize);

// Intitializing the game (function)

function initialize() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;

  gamePlaying = true;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');

  var newGameSound = new Audio('audio/Woosh.mp3');
  newGameSound.play();
}
