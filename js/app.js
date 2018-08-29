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
	}
	
}

let matchedCards = 0;

function matched() {
	openedCards[0].classList.toggle('matched');
	openedCards[1].classList.toggle('matched');
	matchedCards += 2;
	gameWon();
	openedCards = [];
}

function notMatched() {
	openedCards[0].classList.remove('open');
	openedCards[0].classList.remove('disable');
	openedCards[1].classList.remove('open');
	openedCards[1].classList.remove('disable');	
	openedCards = [];
}

function gameWon() {
	if (matchedCards === 16) {
		setTimeout(window.alert, 200, 'You won!');
	}
}
