import { openPopup } from "./index.js";

class Card {
    constructor(item, template) {
        this._item = item;
        this._view = template.querySelector('.element').cloneNode(true);
        this._remove = this._remove.bind(this);
    }

    _remove() {
        this._view.remove();
    }

    _heard(event) {
        event.target.classList.toggle('mask-group__heard_black');
    }

    _imageBig(event) {
        const popupImage = document.querySelector('.popup__image');
        const popupTitle = document.querySelector('.popup__title');
        popupImage.src = event.target.src; // берем ссылку на этот элемент из массива
        popupImage.alt = event.target.alt; // замена alt
        popupTitle.textContent = event.target.alt;
        openPopup(document.querySelector('.popup_big'));
    }


    render() {
        this._view.querySelector('.mask-group__description').textContent = this._item.name;
        this._view.querySelector('.element__image').src = this._item.link;
        this._view.querySelector('.element__image').alt = this._item.name;
        this._view.querySelector('.element__delete').addEventListener('click', this._remove);
        this._view.querySelector('.mask-group__heard').addEventListener('click', this._heard);
        this._view.querySelector('.element__image').addEventListener('click', this._imageBig)
        return this._view;
    }
}

export default Card;