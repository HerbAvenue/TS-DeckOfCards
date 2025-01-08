import { Card } from "./Card";

interface Deck {
    cards: Card[];
    stacks: Map<number, Card[]>;
}

export function initializeDrag(stackElement: HTMLElement, deck: Deck) {
    let newX = 0, newY = 0, startX = 0, startY = 0;
    let draggedElement: HTMLElement | null = null;

    // Mouse down event to initialize the drag
    function mouseDown(e: MouseEvent) {
        
        draggedElement = e.target as HTMLElement;
        e.preventDefault();
        
        //Get initial mouse position
        startX = e.clientX;
        startY = e.clientY;

        document.body.style.cursor = 'grabbing';

        // Set the z-index of the dragged element to 100 (topmost while dragging)
        if (draggedElement) {
            draggedElement.style.zIndex = "100";
        }
        

        // Add event listeners for mousemove and mouseup
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);

        stackElement.style.zIndex = `${deck.stacks.size + 1}`

        // //Update Deck to bring dragged card to top (End of array)
        // const cardId = draggedCard.getAttribute('id');
        // const card = deck.cards.find((card: any) => `${card.value}_${card.suit}` === cardId);

        // if (card) {
        //     // Remove card from current position in deck
        //     deck.cards = deck.cards.filter((c: any) => c !== card);

        //     //Push to end of deck
        //     deck.cards.push(card);

        //     const deckContainer = document.getElementById("sandbox");
        //     if (deckContainer) {
                
        //         // Move it to the end of the deck container
        //         deckContainer.appendChild(draggedCard);  
                
        //         //Update Z-index to always be ontop
        //         draggedCard.style.zIndex = `${deck.cards.length + 1}`;

        //         //Update Z-Index of all cards in the deck
        //         deck.cards.forEach((card: Card, index: number) => {
        //             const cardElement = document.getElementById(`${card.value}_${card.suit}`);
        //             if (cardElement) {
        //                 cardElement.style.zIndex = `${index + 1}`;
        //             }
        //         });
        //     }
        // }

        // //Log deck array for debugging
        // //console.log(deck.cards);
    }

    // Mouse move event for dragging
    function mouseMove(e: MouseEvent) {
        newX = startX - e.clientX;
        newY = startY - e.clientY;

        startX = e.clientX;
        startY = e.clientY;

        // Update the card's position based on mouse movement
        stackElement.style.position = "absolute";
        stackElement.style.top = (stackElement.offsetTop - newY) + 'px';
        stackElement.style.left = (stackElement.offsetLeft - newX) + 'px';
    }

    // Mouse up event to stop dragging
    function mouseUp() {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);

        document.body.style.cursor = 'default';

        // Reset the z-index of the dragged element to 100 (topmost)
        if (draggedElement) {
            draggedElement.style.zIndex = "100";
        }

        // Find the highest z-index among the remaining elements (excluding the dragged one)
        let maxZIndex = 0;
        const allElements = document.querySelectorAll(".card, .stack"); // All card and stack elements
        allElements.forEach((element) => {
            const zIndex = parseInt(window.getComputedStyle(element).zIndex);
            if (!isNaN(zIndex)) {
                maxZIndex = Math.max(maxZIndex, zIndex);
            }
        });

        // Set the z-index of the dragged card to be 1 higher than the highest z-index
        if (draggedElement) {
            draggedElement.style.zIndex = `${maxZIndex + 1}`;
        }

        // Clear the last dragged element
        draggedElement = null;
    }

    // Bind the mousedown event to start the drag
    stackElement.addEventListener('mousedown', mouseDown);
}
