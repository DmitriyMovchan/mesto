import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popup, submitCallback) {
        super(popup);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input')
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            this._submitCallback(this._getInputValues());
            this.closePopup();
            super.setEventListeners();
        })
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}

export default PopupWithForm