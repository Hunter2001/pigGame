'use strict';
// -----------------------------------SELECTING ELEMENTS-------------------------------------------------
// PLAYER ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// SCORE ELEMENTS
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
// CURRENT SCORE ELEMENTS
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
// DICE ELEMENT
const diceEl = document.querySelector('.dice');
// BUTTONS ELEMENTS
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// ---------------------------------STARTING CONDITIONS FUNCTION------------------------------------------
// DEFINE VARIABLES
let scores, currentScore, activePlayer, gameOn;
// FUNCTIONS ITSELF
const baseConditions = function () {
  // SET VARIABLES
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameOn = true;
  // SET INTERFACE TO INIT
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  // SET VALUES TO ZERO
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  // REMOVE THE DICE
  diceEl.classList.add('hidden');
};
// CALL THE FUNCTIONS IN THE BEGINING
baseConditions();

// -------------------------------------SWITCH PLAYER FUNCTION-------------------------------------------------
const switchPlayer = function () {
  // SET CURRENT SCORE TO ZERO AND WRITE IT
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  // SWITCH PLAYER
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//-----------------------------------------------ROLL BUTTON--------------------------------

btnRoll.addEventListener('click', function () {
  if (gameOn) {
    // GENERATE THE RANDOM NUMBER
    const dice = Math.trunc(Math.random() * 6) + 1;
    // DISPLAY DICE ROLL
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // CHECK IF DICE !== 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// --------------------------------------------HOLD BUTTON----------------------------------------

btnHold.addEventListener('click', function () {
  if (gameOn) {
    // ADD CURRENT SCORE TO TOTAL SCORE
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // CHECK IF SCORE > 100
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      gameOn = false;
    } else {
      switchPlayer();
    }
  }
});

// ---------------------------------------------NEW GAME BUTTON-----------------------------------------
btnNew.addEventListener('click', baseConditions);
