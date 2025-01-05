export function initializeDrag(cardElement: HTMLElement) {
    let newX = 0, newY = 0, startX = 0, startY = 0;

    // Mouse down event to initialize the drag
    function mouseDown(e: MouseEvent) {
        startX = e.clientX;
        startY = e.clientY;

        // Add event listeners for mousemove and mouseup
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
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
