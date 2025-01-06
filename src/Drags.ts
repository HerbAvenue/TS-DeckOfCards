export function initializeDrag(cardElement: HTMLElement, deck: any) {
    let newX = 0, newY = 0, startX = 0, startY = 0;
    
    let draggedCard: HTMLElement | null = null;

    // Mouse down event to initialize the drag
    function mouseDown(e: MouseEvent) {
        draggedCard = cardElement;
        startX = e.clientX;
        startY = e.clientY;

        // Add event listeners for mousemove and mouseup
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);

        //Update Deck to bring dragged card to top (End of array)
        const cardId = draggedCard.getAttribute('id');
        const card = deck.cards.find((card: any) => `${card.value}_${card.suit}` === cardId);

        if (card) {
            // Remove card from current position in deck
            deck.cards = deck.cards.filter((c: any) => c !== card);

            //Push to end of deck
            deck.cards.push(card);

            const deckContainer = document.getElementById("sandbox");
            if (deckContainer) {
                
                // Move it to the end of the deck container
                deckContainer.appendChild(draggedCard);  
                
                //Update Z-index to always be ontop
                draggedCard.style.zIndex = `${deck.cards.length + 1}`;
            }
        }

        //Log deck array for debugging
        //console.log(deck.cards);
    }

    // Mouse move event for dragging
    function mouseMove(e: MouseEvent) {
        newX = startX - e.clientX;
        newY = startY - e.clientY;

        startX = e.clientX;
        startY = e.clientY;

        // Update the card's position based on mouse movement
        cardElement.style.top = (cardElement.offsetTop - newY) + 'px';
        cardElement.style.left = (cardElement.offsetLeft - newX) + 'px';
    }

    // Mouse up event to stop dragging
    function mouseUp() {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    }

    // Bind the mousedown event to start the drag
    cardElement.addEventListener('mousedown', mouseDown);
}
