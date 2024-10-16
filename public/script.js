const cards = [];
const fruits = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍍', '🍑', '🍓', '🍋']; // Fruit emojis
const gameContainer = document.getElementById('game-container');
let firstCard = null;
let secondCard = null;
let matchedCards = 0;
let timer;
let elapsedTime = 0;

// Shuffle and initialize cards
const initializeCards = () => {
    const shuffledFruits = [...fruits, ...fruits].sort(() => 0.5 - Math.random());
    gameContainer.innerHTML = '';
    shuffledFruits.forEach((fruit, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = fruit;
        card.innerText = '?';
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
        cards.push(card);
    });
    resetTimer();
};

// Flip card function
const flipCard = (event) => {
    const card = event.target;
    if (firstCard && secondCard) return;

    card.innerText = card.dataset.value;
    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkForMatch();
    }
};

// Check for match
const checkForMatch = () => {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedCards += 2;
        if (matchedCards === cards.length) {
            clearInterval(timer);
            setTimeout(() => {
                showCongratulations();
                promptForScore();
            }, 500);
        }
        resetTurn();
    } else {
        setTimeout(() => {
            firstCard.innerText = '?';
            secondCard.innerText = '?';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetTurn();
        }, 1000);
    }
};

// Reset turn
const resetTurn = () => {
    firstCard = null;
    secondCard = null;
};

// Start timer
const resetTimer = () => {
    clearInterval(timer);
    elapsedTime = 0;
    document.getElementById('timer').innerText = 'Time: 0s';
    timer = setInterval(() => {
        elapsedTime++;
        document.getElementById('timer').innerText = `Time: ${elapsedTime}s`;
    }, 1000);
};

// Show congratulations
const showCongratulations = () => {
    const congrats = document.getElementById('congratulations');
    congrats.innerText = 'Congratulations! You won!';
    congrats.style.display = 'block';
};

// Prompt for score
const promptForScore = () => {
    const username = prompt('Enter your username:');
    if (username) {
        saveScore(username, elapsedTime);
    }
};

// Save score
const saveScore = (username, time) => {
    fetch('/api/game/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, time }),
    })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error('Error:', error));
};

// Reset game
document.getElementById('reset-button').addEventListener('click', () => {
    matchedCards = 0;
    initializeCards();
});

// Start the game
initializeCards();
