// 8 Pairs of Alphabets (A - H) -> 16 Cards Total
const ALPHABETS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// DOM Elements
const gridElement = document.getElementById('card-grid');
const movesElement = document.getElementById('moves-count');
const pairsElement = document.getElementById('pairs-count');
const timerElement = document.getElementById('timer');
const restartBtn = document.getElementById('restart-btn');
const hardcoreToggle = document.getElementById('hardcore-toggle');
const winModal = document.getElementById('win-modal');
const winSummary = document.getElementById('win-summary');
const modalRestartBtn = document.getElementById('modal-restart-btn');

// Game State
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let pairsFound = 0;
let timerSeconds = 0;
let timerInterval = null;
let gameStarted = false;

// 1. Shuffle Array (Fisher-Yates algorithm)
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 2. Initialize / Reset Board
function initGame() {
  // Clear any existing timer
  clearInterval(timerInterval);
  timerSeconds = 0;
  moves = 0;
  pairsFound = 0;
  gameStarted = false;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // Reset UI
  timerElement.textContent = "00:00";
  movesElement.textContent = "0";
  pairsElement.textContent = "0 / 8";
  winModal.classList.remove('active');
  gridElement.innerHTML = '';

  // Generate pair list: ['A', 'A', 'B', 'B', ...]
  const pairList = shuffle([...ALPHABETS, ...ALPHABETS]);

  // Create card DOM elements
  pairList.forEach((letter, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.letter = letter;
    card.dataset.index = index;

    card.innerHTML = `
      <div class="card-face card-back">?</div>
      <div class="card-face card-front">${letter}</div>
    `;

    card.addEventListener('click', handleCardClick);
    gridElement.appendChild(card);
  });
}

// 3. Card Click Handler
function handleCardClick(e) {
  const clickedCard = e.currentTarget;

  // Prevent clicking if board is locked, or already flipped/matched
  if (lockBoard) return;
  if (clickedCard === firstCard) return;
  if (clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) return;

  // Start timer on very first move
  if (!gameStarted) {
    startTimer();
    gameStarted = true;
  }

  // Flip the selected card
  clickedCard.classList.add('flipped');

  if (!firstCard) {
    // First card selected
    firstCard = clickedCard;
    return;
  }

  // Second card selected
  secondCard = clickedCard;
  incrementMoves();
  checkMatch();
}

// 4. Check for Match
function checkMatch() {
  const isMatch = firstCard.dataset.letter === secondCard.dataset.letter;

  if (isMatch) {
    handleSuccessMatch();
  } else {
    handleMismatch();
  }
}

// 5. Successful Pair Found
function handleSuccessMatch() {
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');

  pairsFound++;
  pairsElement.textContent = `${pairsFound} / 8`;

  resetCardSelection();

  // Check if player won
  if (pairsFound === ALPHABETS.length) {
    clearInterval(timerInterval);
    setTimeout(showWinModal, 600);
  }
}

// 6. Mismatch Logic (Includes Hardcore Reset Rule)
function handleMismatch() {
  lockBoard = true;

  // Shake animation
  firstCard.classList.add('shake');
  secondCard.classList.add('shake');

  setTimeout(() => {
    firstCard.classList.remove('shake');
    secondCard.classList.remove('shake');

    // Standard rule: Flip current 2 cards back
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');

    // Hardcore Mode: If user toggled it ON, a single error resets ALL matched cards!
    if (hardcoreToggle.checked && pairsFound > 0) {
      const allMatchedCards = document.querySelectorAll('.card.matched');
      allMatchedCards.forEach(c => {
        c.classList.remove('matched', 'flipped');
      });
      pairsFound = 0;
      pairsElement.textContent = `0 / 8`;
    }

    resetCardSelection();
  }, 900);
}

function resetCardSelection() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function incrementMoves() {
  moves++;
  movesElement.textContent = moves;
}

// 7. Timer
function startTimer() {
  timerInterval = setInterval(() => {
    timerSeconds++;
    const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
    const secs = String(timerSeconds % 60).padStart(2, '0');
    timerElement.textContent = `${mins}:${secs}`;
  }, 1000);
}

// 8. Win Modal
function showWinModal() {
  winSummary.textContent = `Completed in ${moves} moves and ${timerElement.textContent} minutes!`;
  winModal.classList.add('active');
}

// Event Listeners
restartBtn.addEventListener('click', initGame);
modalRestartBtn.addEventListener('click', initGame);

// Launch on page load
initGame();