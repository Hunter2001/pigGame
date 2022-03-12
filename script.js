'use strict';
// -----------------------------------SELECTING ELEMENTS-------------------------------------------------
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// ---------------------------------STARTING CONDITIONS FUNCTION------------------------------------------
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let gameOn = true;

const baseConditions = function () {
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  if (activePlayer === 1) {
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  gameOn = true;
};

baseConditions();

// -------------------------------------SWITCH PLAYER FUNCTION-------------------------------------------------
const switchPlayer = function () {
  // anihilate current score
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  //   switch player
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//-----------------------------------------------ROLL BUTTON--------------------------------

btnRoll.addEventListener('click', function () {
  if (gameOn) {
    // generate the random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // if dice = 1 -> switch player
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
    // add current score to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if score > 100
    if (scores[activePlayer] >= 10) {
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
btnNew.addEventListener('click', function () {
  console.log(`button new was clicked`);
  baseConditions();
});
