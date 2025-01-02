import { Card } from "./Card"

export class Deck {
    private cards: Card[] = [];
    private suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    private values = [
        "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"
    ];

    constructor() {
        this.initializeDeck();
    }

    private initializeDeck(): void {
        this.cards = [];
        for (const suit of this.suits) {
            for (const value of this.values) {
                this.cards.push(new Card(suit, value));
            }
        }
    }

    shuffle(): void {
        for (let i = this.cards.length -1; i > 0; i--) {
           const j = Math.floor(Math.random() * (i + 1));
           [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
        }
    }

    draw(): Card | undefined {
        return this.cards.pop();
    }

    reset(): void {
        this.initializeDeck();
        this.shuffle();
    }

    printDeck(): void {
        this.cards.forEach(Card => console.log(Card.toString()));
    }
}