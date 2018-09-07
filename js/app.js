//
// 
// Declarations
//
//

// Cards array holds all the cards
let card = document.getElementsByClassName('card');
let cards = [...card];

let gameBoard = document.querySelector('.game-board');

//
// 
// Shuffle logic
//
//

function shuffleCards(array) {
	let remainingCards = array.length, temporaryValue, randomIndex;

	// While there are cards to shuffle
	while (remainingCards) {
		// Pick a random card
		randomIndex = Math.floor(Math.random() * remainingCards--);
		// Swap it with the last remaining card
		temporaryValue = array[remainingCards];
		array[remainingCards] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	// Add cards to the game board
	for (let i = 0; i < cards.length; i++) {
		card = cards[i];
		// Close all cards
		card.classList.remove('open');
		card.classList.remove('disable');
		card.classList.remove('wrong');
		card.classList.remove('matched');
		gameBoard.appendChild(card);
	}
}

// Shuffle cards on load
document.addEventListener('DOMContentLoaded', shuffleCards(cards));

//
//
// Match card logic
//
//

// For loop to add event listeners to each card
for (let i = 0; i < cards.length; i++) {
	card = cards[i];
	card.addEventListener('click', openCard);
	card.addEventListener('click', matchCard);
};

// Open card
function openCard() {
	this.classList.toggle('open');
	this.classList.toggle('disable');
}

// Check if the two opened cards match
let openedCards = [];

function matchCard() {
	openedCards.push(this);
	let len = openedCards.length;
	if (len === 2) {
		addMove();
		if (openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className) {
			matched();
		} else {
			gameBoard.classList.toggle('disable');
			setTimeout(function(){openedCards[0].classList.toggle('wrong')},300);
			setTimeout(function(){openedCards[1].classList.toggle('wrong')},300);
			setTimeout(notMatched, 900);
		}
	}
}

// If the cards match, add the 'matched' class to show that they are matched
let matchedCards = 0;

function matched() {
	openedCards[0].classList.toggle('matched');
	openedCards[1].classList.toggle('matched');
	matchedCards += 2;
	gameWon();
	openedCards = [];
}

// If the cards don't match, remove the 'open' and 'disable' classes to close the cards
function notMatched() {
	openedCards[0].classList.remove('open');
	openedCards[0].classList.remove('disable');
	openedCards[0].classList.remove('wrong');
	openedCards[1].classList.remove('open');
	openedCards[1].classList.remove('disable');
	openedCards[1].classList.remove('wrong');
	gameBoard.classList.remove('disable');
	openedCards = [];
}

//
//
// Move Counter
//
//

// Update moves counter text
var interval;
let movesCount = 0
const moves = document.querySelector('.moves');

function addMove() {
	movesCount ++;
	moves.innerHTML = movesCount;
	// Calculate star rating
	starsCount();
	// start timer on first move
	if (movesCount === 1) {
		start();
		interval = setInterval(current, 1000);
	}
}

//
//
// Star rating
//
//

// Update stars count based on the number of moves 
let winningStars;
const stars = document.querySelector('.stars');

function starsCount() {
	if (movesCount > 50) {
		winningStars = "<i class=\"fas fa-star\"></i>";
		stars.innerHTML = winningStars;
	} else if (movesCount > 20) {
		winningStars = "<i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i>";
		stars.innerHTML = winningStars;
	} else {
		winningStars = "<i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i>"
		stars.innerHTML = winningStars;
	}
}

//
//
// Timer
//
//

// Declarations
let startTime, currentTime, timeDiff, elapsedTime;
const time = document.querySelector('.time');

// Set starting time
function start() {
	startTime = Date.now();
}

// Set current time
function current() {
	currentTime = Date.now();
	timeDiff = (currentTime - startTime);
	timeDiff /= 1000;
	if (timeDiff < 60) {
		elapsedTime = Math.floor(timeDiff) + ' s';
		time.innerHTML = elapsedTime;
	} else if (60 <= timeDiff < 3600) {
		let minutes = Math.floor(timeDiff / 60);
		let seconds = Math.floor(timeDiff % 60);
		elapsedTime = minutes + ' m ' + seconds + ' s';
		time.innerHTML = elapsedTime;
	} else if (timeDiff >= 3600) {
		let hours = Math.floor(timeDiff / 3600);
		let minutes = Math.floor((timeDiff - hours * 3600) / 60);
		let seconds = Math.floor(timeDiff - hours * 3600 - minutes * 60);
		elapsedTime = hours + ' h ' + minutes + ' m ' + seconds + ' s';
		time.innerHTML = elapsedTime;
	}
}

//
//
// Winning logic
//
//

// Declarations
const winningModal = document.querySelector('.winning-modal');
const finishTime = document.querySelector('.finish-time');
const finishMoves = document.querySelector('.finish-moves');
const finishStars = document.querySelector('.finish-stars');

// Check if there are 16 matched cards and show congratulations modal
function gameWon() {
	if (matchedCards === 16) {
		clearInterval(interval);
		winningModal.classList.toggle('show');
		finishTime.innerHTML = elapsedTime;
		finishMoves.innerHTML = movesCount;
		finishStars.innerHTML = winningStars;
	}
}

//
//
// Restart
//
//

// Restart game on clicking "Restart" or "Play Again"
let restart = document.querySelector('.restart');
let playAgain = document.querySelector('.play-again');

function restartGame() {
	//shuffleCards
	shuffleCards(cards);
	// Restart moves count
	movesCount = 0;
	moves.innerHTML = movesCount;
	// Restart timer
	clearInterval(interval);
	time.innerHTML = '0 s';
}

restart.addEventListener('click', restartGame);
playAgain.addEventListener('click', restartGame);

// Shortcut for restarting the game
function restartShortcut(e) {
	if (e.key == 'r') {
		restartGame();
	}
}

document.addEventListener('keydown', restartShortcut);