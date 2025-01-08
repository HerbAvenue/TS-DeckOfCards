import { Card } from "./Card"

export class Deck {
    public cards: Card[] = [];
    private suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    private values = [
        "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"
    ];

    //Stack Tracker
    private nextStackId = 0; //Identifier for stacks
    public stacks: Map<number, Card[]> = new Map();
    
    //Individual cards (Outside of any stack)
    public standaloneCards: Card[] = [];

    constructor() {
        this.initializeDeck();
        this.initializeStacks();
    }

    private initializeDeck(): void {
        this.cards = [];
        for (const suit of this.suits) {
            for (const value of this.values) {
                this.cards.push(new Card(suit, value));
            }
        }
    }

    private initializeStacks(): void {
        this.stacks.set(this.nextStackId++, [...this.cards]); //May need to remove spread syntax later

    }

    //Shuffle Function
    shuffle(): void {
        for (let i = this.cards.length -1; i > 0; i--) {
           const j = Math.floor(Math.random() * (i + 1));
           [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
        }
    }

    //Draw a card from a stack.
    drawFromStack(stackId: number): Card | null {
        const stack = this.stacks.get(stackId);

        if (stack && stack.length > 0) {
            const drawnCard = stack.pop()!;
            
            if (drawnCard) {
                this.standaloneCards.push(drawnCard);
                return drawnCard;
            }
        }
        return null;
    }

    reset(): void {
        this.initializeDeck();
        this.initializeStacks();
        this.shuffle();
    }

    printDeck(): void {
        this.cards.forEach(Card => console.log(Card.toString()));
    }

    //Stack related functions below:
    //Create new stack with cards
    createStack(card: Card): number {
        const newStackId = this.nextStackId++;
        this.stacks.set(newStackId, [card]);
        return newStackId;
    }

    //Move card from one stack to another
    moveCardToStack(card: Card, fromStackId: number, toStackId: number): void {
        const fromStack = this.stacks.get(fromStackId);
        const toStack = this.stacks.get(toStackId);

        if (!fromStack || !toStack) {
            throw new Error("Invalid stack IDs");
        }

        //Remove card from source stack
        const cardIndex = fromStack.findIndex(c => c === card);
        if (cardIndex > -1) {
            fromStack.splice(cardIndex, 1);
            toStack.push(card);

            //Remove stack if empty
            if (fromStack.length === 0) {
                this.stacks.delete(fromStackId);
            }
        }
    }

    //Log stacks for debugging
    printStacks(): void {
        this.stacks.forEach((stack, stackId) => {
            console.log(`Stack ${stackId}:`);
            stack.forEach(card => console.log(card.toString()));
        });
    }
}