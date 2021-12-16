class FormValidator {
    constructor(config) {
        this._config = config
        this._forms = [...document.querySelectorAll(config.formSelector)]
        console.log(this._forms)
    }

    _handleSubmit(event) {
        event.preventDefault()
        console.log('preventDefault')
    }

    _setSubmitButtonState(form) {
        const button = form.querySelector(this._config.submitButtonSelector)
        button.disabled = !form.checkValidity()
        button.classList.toggle(
            this._config.submitButtonErrorClass,
            !form.checkValidity()
        )
    }

    _handleFiledValidation(input, form) {
        if (!input.validity.valid) {
            this._showError(input, form)
        } else {
            this._hideError(input, form)
        }
    }

    _showError(input, form) {
        const errorElement = form.querySelector(`#${input.id}-error`)
        input.classList.add(this._config.inputErrorClass)
        errorElement.textContent = input.validationMessage
    }

    _hideError(input, form) {
        const errorElement = form.querySelector(`#${input.id}-error`)
        input.classList.remove(this._config.inputErrorClass)
        errorElement.textContent = ''
    }

    _setEventListeners(forms) {
        forms.forEach((form) => {
            form.addEventListener('submit', (event) => {
                this._handleSubmit(event)
            })
            form.addEventListener('input', (event) => {
                this._setSubmitButtonState(form)
            })

            const inputs = [
                ...form.querySelectorAll(this._config.inputSelector),
            ]
            inputs.forEach((inputElement) => {
                inputElement.addEventListener('input', () =>
                    this._handleFiledValidation(inputElement, form)
                )
            })
        });
    }

    enableValidation() {
        this._setEventListeners(this._forms)
    }
}

export default FormValidator