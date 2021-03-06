import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popup, submitCallback, loadingTitle) {
        super(popup);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._loadingTitle = loadingTitle;
        this._popupButton = this._popup.querySelector('.popup__button')
    }

    // собирает все инпуты в форме
    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    changeSubmitHandler(newSubmitHandler) {
        this._submitCallback = newSubmitHandler;
    }

    // слушает сабмит
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', () => {
            if (!this._form.checkValidity()) return false
            const lastText = this._popupButton.textContent
            this._popupButton.textContent = this._loadingTitle;
            /*if (this._submitCallback) this._submitCallback(this._getInputValues(), () => {
                this.closePopup();
                this._popupButton.textContent = lastText;
            });*/
            this._submitCallback(this._getInputValues())
                .then((obj) => {
                    this.closePopup();
                })
                .catch((obj) => {
                    console.log(obj);
                })
                .finally((obj) => {
                    this._popupButton.textContent = lastText;
                });
        })
    }

    serverUpload() {
        const button = this._popupButton
        button.textContent = 'Сохранение...'
    }

    // закрывает попап и чистит форму
    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}

export default PopupWithForm