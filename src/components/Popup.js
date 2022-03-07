class Popup {
    constructor(popup) {
        this._popup = popup;
    }


    openPopup() {
        //открывает попап
        this._popup.classList.add('popup_open'); // добавление класса
        document.addEventListener('keydown', this._handleEscClose);

    }

    closePopup() {
        // закрывает попап
        this._popup.classList.remove('popup_open') // удаляет класс
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.closePopup()
        }
    }

    setEventListeners() {
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