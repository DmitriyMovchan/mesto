class Section {
    constructor(component, cards, renderer) {
        this._component = component;
        this._cards = cards;
        this._renderer = renderer;
    }

    addCard(item) {
        const card = this._renderer(item);
        const view = card.render();
        this._component.append(view);
    }


}

export default Section;