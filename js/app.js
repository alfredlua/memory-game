//
// Add event listener to all cards
//

// Open card
function openCard() {
	this.classList.toggle('open');
	this.classList.toggle('disable');
}

// Cards array holds all the cards
let card = document.getElementsByClassName('card');
let cards = [...card];

// For loop to add event listeners to each card
for (let i = 0; i < cards.length; i++) {
	card = cards[i];
	card.addEventListener('click', openCard);
	card.addEventListener('click', matchCard);
};

//
// Match card logic
//

// Check if the two opened cards match
let openedCards = [];

function matchCard() {
	openedCards.push(this);
	let len = openedCards.length;
	if (len === 2) {
		if (openedCards[0].title === openedCards[1].title) {
			matched();
		} else {
			setTimeout(notMatched, 500);
		}
		addMove();
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
	openedCards[1].classList.remove('open');
	openedCards[1].classList.remove('disable');	
	openedCards = [];
}

//
// Move Counter
//

// Update moves counter text
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
		setInterval(current, 1000);
	}
}

//
// Star rating
// 

const stars = document.querySelector('.stars');

function starsCount() {
	if (movesCount > 50) {
		stars.innerHTML = "<i class=\"fas fa-star\"></i>";
	} else if (movesCount > 20) {
		stars.innerHTML = "<i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i>";
	}
}

//
// Timer
//

// Show the elapsed time
let startTime, currentTime;
const time = document.querySelector('.time');
// Set starting time
function start() {
	startTime = Date.now();
}
// Set current time
function current() {
	currentTime = Date.now();
	let timeDiff = (currentTime - startTime);
	timeDiff /= 1000;
	if (timeDiff < 60) {
		time.innerHTML = Math.floor(timeDiff) + ' s';
	} else if (60 <= timeDiff < 3600) {
		let minutes = Math.floor(timeDiff / 60);
		let seconds = Math.floor(timeDiff % 60);
		time.innerHTML = minutes + ' m ' + seconds + ' s';
	} else if (timeDiff >= 3600) {
		let hours = Math.round(timeDiff / 3600);
		let minutes = Math.round((timeDiff - hours * 3600) / 60);
		let seconds = Math.round(timeDiff - hours * 3600 - minutes * 60);
		time.innerHTML = hours + ' h ' + minutes + ' m ' + seconds + ' s';
	}
}

//
// Winning logic
//

// Check if there are 16 matched cards and show congratulations modal
function gameWon() {
	if (matchedCards === 16) {
		setTimeout(window.alert, 200, 'You won!');
	}
}
