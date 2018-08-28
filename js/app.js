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

let openedcards = [];

function matchCard() {
	openedcards.push(this);
	var len = openedcards.length;
	if (len === 2) {
		if (openedcards[0].title === openedcards[1].title) {
			matched();
		} else {
			notMatched();
		}
	}
	
}

function matched() {
	openedcards[0].classList.toggle('matched');
	openedcards[1].classList.toggle('matched');
	openedcards = [];
}

function notMatched() {
	openedcards[0].classList.remove('open');
	openedcards[0].classList.remove('disable');
	openedcards[1].classList.remove('open');
	openedcards[1].classList.remove('disable');	
	openedcards = [];
}
