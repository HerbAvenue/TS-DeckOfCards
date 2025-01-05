import { Deck } from "./Deck";
import { initializeDrag } from "./Drags";
import './styles/main.css';

const deckContainer = document.getElementById("deck")!;

const deck = new Deck();

function renderDeck() {
    deckContainer.innerHTML = "";

    deck["cards"].forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute('id', 'card');
        cardElement.setAttribute('draggable', 'false');
        
        initializeDrag(cardElement);
        
        
        const cardImage = document.createElement("img");
        cardImage.setAttribute('draggable', 'false');
        cardImage.src = `images/${card.value}_${card.suit.toLowerCase()}.png`;

        cardElement.appendChild(cardImage);
        deckContainer.appendChild(cardElement);
    });
}

renderDeck();