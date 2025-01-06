import { Deck } from "./Deck";
import { initializeDrag } from "./Drags";
import './styles/main.css';

const deckContainer = document.getElementById("sandbox")!;

const deck = new Deck();

function renderDeck() {
    deckContainer.innerHTML = "";

    deck.cards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute('id', `${card.value}_${card.suit}`);
        cardElement.setAttribute('draggable', 'false');
        
        //Add Image to the card HTML Element
        const cardImage = document.createElement("img");
        cardImage.setAttribute('draggable', 'false');
        cardImage.src = `images/${card.value}_${card.suit.toLowerCase()}.png`;
        cardElement.appendChild(cardImage);

        // Set z-index based on card's position in the array
        cardElement.style.zIndex = `${index + 1}`;

        deckContainer.appendChild(cardElement);
        initializeDrag(cardElement, deck);
    });
}

renderDeck();