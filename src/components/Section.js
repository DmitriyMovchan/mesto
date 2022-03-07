class Section {
    constructor(component, cards, renderer) {
        this._component = component;
        this._cards = cards;
        this._renderer = renderer;
        this.renderItems();
    }

    addCard(item) {
        const card = this._renderer(item);
        this._component.append(card);
    }

    renderItems() {
        this._cards.forEach((item) => {
            this.addCard(item)
        })
    }
}

export default Section;