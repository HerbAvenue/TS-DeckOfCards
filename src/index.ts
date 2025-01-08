import { Deck } from "./Deck";
import { initializeDrag } from "./Drags";
import { initializePopupMenu } from "./PopupMenu";
import './styles/main.css';

const deck = new Deck();

const deckSandbox = document.getElementById("sandbox")!;


function renderCards() {
    deckSandbox.innerHTML = "";

    //Render each stack
    deck.stacks.forEach((cardsInStack, stackKey) => {
        
        //Create stack divs
        const stackElement = document.createElement("div");
        stackElement.classList.add("stack");
        stackElement.setAttribute('id', `stack-${stackKey}`);

        //Render each card
        cardsInStack.forEach((card) => {
            
            //Create Card divs
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.setAttribute('id', `c-${card.value}_${card.suit}`);
            cardElement.setAttribute('draggable', 'false');
            
            //Add Image to the card HTML Element
            const cardImage = document.createElement("img");
            cardImage.setAttribute('draggable', 'false');
            cardImage.src = `images/${card.value}_${card.suit.toLowerCase()}.png`;
            cardElement.appendChild(cardImage);
    
            // Set z-index based on card's position in the array
            cardElement.style.zIndex = `${cardsInStack.indexOf(card) + 1}`;
    
            stackElement.appendChild(cardElement);
        });

        // Add the dynamic card count to the stack
        const cardCountElement = document.createElement("span");
        cardCountElement.classList.add("card-count");
        cardCountElement.innerText = `${cardsInStack.length}`; // Set the number of cards in the stack
        stackElement.appendChild(cardCountElement);
        
        deckSandbox.appendChild(stackElement);
        
        //Initialize drag for STACK
        initializeDrag(stackElement, deck);

        //Initialize Popup Menu
        initializePopupMenu(stackElement, [
            {
                label: "Draw Card",
                action: () => {
                    const drawnCard = deck.drawFromStack(stackKey);
                    if (drawnCard) { 
                        renderStandaloneCard(drawnCard, stackElement);
                        cardCountElement.innerText = `${cardsInStack.length}`;
                    }
                },
            },
        ]);
    });

    // Render standalone cards
    deck.standaloneCards.forEach((card, index) => {
        renderStandaloneCard(card, null, index);
    });
}

// Function to render a standalone card at a position
function renderStandaloneCard(card: any, stackElement: HTMLElement | null, index: number = 0) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("id", `c-${card.value}_${card.suit}`);
    cardElement.setAttribute("draggable", "false");

    // Add Image to the card HTML Element
    const cardImage = document.createElement("img");
    cardImage.setAttribute("draggable", "false");
    cardImage.src = `images/${card.value}_${card.suit.toLowerCase()}.png`;
    cardElement.appendChild(cardImage);

    // Append the card to the DOM first to ensure it's rendered
    deckSandbox.appendChild(cardElement);
    initializeDrag(cardElement, deck);

    //Set z-index based on the cards index in stack
    cardElement.style.zIndex = `${index + 1}`;

    // If the card is drawn, position it beside the stack
    if (stackElement) {
        
        // Remove the card from the stack in the DOM
        const cardInStack = stackElement.querySelector(`#c-${card.value}_${card.suit}`);
        if (cardInStack) {
            cardInStack.remove();
        }
        
        // Get stack's current position on the screen
        const stackRect = stackElement.getBoundingClientRect();
        
        // Offset the card slightly to the right (X-axis offset)
        let cardLeft = stackRect.left + 200; // 20px to the right of the stack

        // Ensure the card doesn't go off the right of the screen
        const maxLeft = window.innerWidth - cardElement.offsetWidth - 20; // 20px margin from the right
        cardLeft = Math.min(cardLeft, maxLeft); // Clamp to screen width

        // Set position of the card relative to the stack
        cardElement.style.position = "absolute";
        cardElement.style.left = `${cardLeft}px`; // Set the X position with offset
        cardElement.style.top = `${stackRect.top}px`; // Align vertically with the stack
    } else {
        // Otherwise, position the standalone cards as before
        cardElement.style.position = "absolute";
        cardElement.style.left = `${deckSandbox.offsetWidth + 20}px`;
        cardElement.style.top = `${index * 30}px`;
    }
}

//Render All Cards on page load.
renderCards();