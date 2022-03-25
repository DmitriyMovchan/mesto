class Popup {
    constructor(popup) {
        this._popup = popup;
    }


    openPopup() {
        //открывает попап
        this._popup.classList.add('popup_open');
        document.addEventListener('keydown', this._handleEscClose);
    }

    closePopup() {
        // закрывает попап
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (event) => {
        // закрывает попап на esc
        if (event.key === 'Escape') {
            this.closePopup()
        }
    }

    serverUpload() {
        const button = this._popup.querySelector('.popup__button')

        button.textContent = 'Сохранение...'
    }

    setEventListeners() {
        // закрывает попап на оверлее и кнопке закрытия
        this._popup.addEventListener('mousedown', (event) => {

            if (
                event.target.classList.contains('popup_open') ||
                event.target.classList.contains('popup__close')
            ) {
                this.closePopup()
            }
        })
    }
}

export default Popup