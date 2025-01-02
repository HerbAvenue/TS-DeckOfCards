import { Deck } from "./Deck";

const deckContainer = document.getElementById("deck")!; //Why ! at end?
const shuffleButton = document.getElementById("shuffle")!;
const drawButton = document.getElementById("draw")!;

//Init Deck
const deck = new Deck();

//Render in DOM
function renderDeck() {
    deckContainer.innerHTML = "";

    deck["cards"].forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        
        const cardImage = document.createElement("img");
        cardImage.src = `images/${card.value}_${card.suit.toLowerCase()}.png`;

        cardElement.appendChild(cardImage);

        deckContainer.appendChild(cardElement);
    });
}

renderDeck();