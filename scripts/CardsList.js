class CardsList {
    constructor (component, cards, createCard) {
        this._component = component;
        this._cards = cards;
        this._createCard = createCard;
    }

    addCard(item) {
        const card = this._createCard(item);
        const view = card.render();
        this._component.append(view);
    }

    
}

export default CardsList;
