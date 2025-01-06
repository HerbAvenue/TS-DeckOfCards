import { Card } from "./Card"

export class Stack {
    private cards: Card[] = [];

    shuffle(): void {
        for (let i = this.cards.length -1; i > 0; i--) {
           const j = Math.floor(Math.random() * (i + 1));
           [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
        }
    }

    draw(): Card | undefined {
        return this.cards.pop();
    }

    printDeck(): void {
        this.cards.forEach(Card => console.log(Card.toString()));
    }
}