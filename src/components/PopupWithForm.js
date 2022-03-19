import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popup, submitCallback) {
        super(popup);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input')
    }

    // собирает все инпуты в форме
    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    changeSubmitHandler(newSubmitHandler) {
        this._submitCallback = newSubmitHandler;
    }

    // слушает сабмит
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', () => {
            if (!this._form.checkValidity()) return false
            this._submitCallback(this._getInputValues());
            this.closePopup();
        })
    }

    // закрывает попап и чистит форму
    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}

export default PopupWithForm