import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._link = document.querySelector('.popup__image');
        this._name = document.querySelector('.popup__title')
    }

    openPopup(name, link) {
        this._link.src = link;
        this._link.alt = name;
        this._name.textContent = name;
        super.openPopup();
    }
}

export default PopupWithImage