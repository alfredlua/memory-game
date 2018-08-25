//
// 
// Open card
//
//

function openCard() {
	event.target.classList.toggle('open');
	event.target.classList.toggle('show');
	console.log('A card is opened.');
}

document.addEventListener('click', openCard);