class FormValidator {
    constructor(formElement, config) {
        this._config = config;
        this._form = formElement;
        this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    }

    _handleSubmit(event) {
        event.preventDefault()
    }

    _setSubmitButtonState() {
        console.log(777)
        this._buttonElement.disabled = !this._form.checkValidity();
        this._buttonElement.classList.toggle(
            this._config.submitButtonErrorClass, !this._form.checkValidity()
        )
    }

    _handleFiledValidation(input) {
        this._setSubmitButtonState()
        if (!input.validity.valid) {
            this._showError(input, this._form)
        } else {
            this._hideError(input, this._form)
        }
    }

    _showError(input) {
        const errorElement = this._form.querySelector(`#${input.id}-error`)
        input.classList.add(this._config.inputErrorClass)
        errorElement.textContent = input.validationMessage;
    }

    _hideError(input) {
        const errorElement = this._form.querySelector(`#${input.id}-error`)
        input.classList.remove(this._config.inputErrorClass)
        errorElement.textContent = ''
    }

    _hasInvalidInput() {
        return this._inputs.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    resetValidation() {
        console.log(555);
        this._setSubmitButtonState();
        this._inputs.forEach((inputElement) => {
            this._hideError(inputElement)
        });

    }

    _setEventListeners() {
        this._form.addEventListener('submit', (event) => {
            this._handleSubmit(event)
        });
        this._inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._handleFiledValidation(inputElement);
                this._setSubmitButtonState();
            });

        });

    }

    enableValidation() {
        this._setEventListeners()
    }
}

export default FormValidator