//variable to select all cards

const cards = document.querySelectorAll('.memory-card');


//these variables manage the flip state of the card and preventing extra flips

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//function to add the flip class to the cards that are clicked
//hasFlippedCard checks if this is the first card clicked
//when second card is flipped it triggers the match checking function
//if the board is locked, you can't flip any more cards

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    //second click
    secondCard = this;

    checkForMatch();
}

//checks if the two flipped cards match

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

//if the cards match, this disables them so they can't be flipped again

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//if cards don't match, it unflips them and unlocks the board

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

//function uses destructuring assignment to keep code short

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//Function generates a random number and applies it to each card suffles deck

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();


//this loops over the cards and checks if the card is clicked and applies class

cards.forEach(card => card.addEventListener('click', flipCard));

