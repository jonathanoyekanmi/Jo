const mobileMenu = document.querySelector('.mobile-menu').addEventListener('click', showMobileMenu);

function showMobileMenu() {
	document.querySelector('.main-nav ul').classList.toggle('show');
}

window.addEventListener('click', clearMobileMenu); 

function clearMobileMenu(e) {
	if (e.target === mobileMenu) {
		mobileMenu.style.display = 'none';
	}
}

const whitemode = document.querySelector('#whitemode');
const body = document.querySelector('.body');

const showLightBg = whitemode.addEventListener('click', turnOn);
// const turnRed = document.querySelector('#whitemode').addEventListener('click', colorRed);


function turnOn() {
		body.classList.toggle('lightmode');
}

const typing = function(txtElement, words, wait = 3000) {
	this.txtElement = txtElement;
	this.words = words;
	this.txt = '';
	this.wordIndex = 0;
	this.wait = parseInt(wait, 10);
	this.type();
	this.isDeleting = false;
}


// Type Method
typing.prototype.type = function() {
	// Get current Index of word
	const current = this.wordIndex % this.words.length;
	// Get Fulltext of current word
	const fullTxt = this.words[current];
	// Check if deleting
	if (this.isDeleting) {
		// Remove Char
		this.txt =  fullTxt.substring(0, this.txt.length - 1);
	} else {
		// Add char
		this.txt =  fullTxt.substring(0, this.txt.length + 1);
	}

	// insert text into element
	this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

	// Typing Speed
	let typeSpeed = 300;   

	if (this.isDeleting) {
		typeSpeed /= 2;
	} 

	// If Word Completes
	if (!this.isDeleting && this.txt === fullTxt ) {
		// Pause at the end of each word
		typeSpeed = this.wait;
		// Let deleting be true
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		// Move to the next word
		this.wordIndex++;
		// pause before typing next word
		typeSpeed = 1;
	}


	setTimeout(() => this.type(), typeSpeed);
}


// Initialize typing on DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init Effect
function init() {
	const txtElement = document.querySelector('.txt-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');

	// initialize typing
	new typing(txtElement, words, wait);

}