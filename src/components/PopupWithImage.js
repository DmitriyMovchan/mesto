import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._link = this._popup.querySelector('.popup__image');
        this._name = this._popup.querySelector('.popup__title')
    }

    // открывает попап картинки
    openPopup(name, link) {
        this._link.src = link;
        this._link.alt = name;
        this._name.textContent = name;
        super.openPopup();
    }
}

export default PopupWithImage