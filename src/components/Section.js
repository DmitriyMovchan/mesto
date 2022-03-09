class Section {
    constructor(component, cards, renderer) {
        this._component = component;
        this._cards = cards;
        this._renderer = renderer;
        this.renderItems();
    }

    // добавляет новые карточки в DOM
    addCard(item) {
        const card = this._renderer(item);
        this._component.append(card);
    }

    // добавляет массив из 6 карточек в DOM
    renderItems() {
        this._cards.forEach((item) => {
            this.addCard(item)
        })
    }

    // отрисовывет карточки на странице
    prependCard(item) {
        const element = this._renderer(item)
        this._component.prepend(element)
    }
}

export default Section;