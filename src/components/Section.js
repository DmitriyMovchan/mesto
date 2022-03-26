class Section {
    constructor(component, cards, renderer) {
        this._component = component;
        this._cards = cards;
        this._renderer = renderer;
    }

    // добавляет новые карточки в DOM
    addCard(item) {
        const card = this._renderer(item);
        //const view = card.render();
        this._component.append(card);
    }

    // добавляет массив из 6 карточек в DOM
    renderItems() {
        this._cards.forEach(() => {
            this.addCard()
        })
    }

    // отрисовывет добавленные карточки на странице
    prependCard(item) {
        console.log('kkk')
        const element = this._renderer(item)
        this._component.prepend(element)
    }
}

export default Section;