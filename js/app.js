
// Add event listener to all cards

// Cards array holds all the cards
let card = document.getElementsByClassName('card');
let cards = [...card];
// For loop to add event listeners to each card
for (let i = 0; i < cards.length; i++) {
	cards[i].addEventListener('click', openCard);
};

// Open card

function openCard() {
	this.classList.toggle('open');
	this.classList.toggle('disable');
}
