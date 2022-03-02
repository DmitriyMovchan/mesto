import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popup, submitCallback) {
        super(popup);
        this._submitCallback = submitCallback
        this._form = document.querySelector('.popup__form')
    }

    _getInputValues() {
        this._listInput = this._form.document.querySelectorAll('.popup__input')
        this._inputValues = {};
        this._listInput.forEach(input => {
            this._inputValues[input.name] = input.value;

        });
        console.log(this._inputValues)
        return this._inputValues;

    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
            this.closePopup();
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}

export default PopupWithForm