export class Card {
    constructor(public suit: string, public value: string) {}

    toString(): string {
        return `${this.value} of ${this.suit}`;
    }
}