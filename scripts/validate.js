const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_error',
    submitButtonSelector: '.popup__button',
    submitButtonErrorClass: 'popup__button_invalid'
}

function enableValidation(validationConfig) {
    const forms = [...document.querySelectorAll(validationConfig.formSelector)];
    forms.forEach((form) => setFormListeners(form, validationConfig));
}

function setFormListeners(form, config) {
    form.addEventListener('submit', hadleSubmit);
    form.addEventListener('input', () => setSubmitButtonState(form, config));

    const inputs = [...form.querySelectorAll(config.inputSelector)]
    inputs.forEach(inputElement => {
        inputElement.addEventListener('input', () => handleFiledValidation(inputElement, form, config))
    })
    setSubmitButtonState(form, config);
}

function setSubmitButtonState(form, config) {
    const button = form.querySelector(config.submitButtonSelector);
    button.disabled = !form.checkValidity();
    button.classList.toggle(config.submitButtonErrorClass, !form.checkValidity())
}

function hadleSubmit(event) {
    event.preventDefault();
}


function handleFiledValidation(input, form, config) {
    if (!input.validity.valid) {
        showError(input, form, config);
    } else {
        hideError(input, form, config)
    }
}

function showError(input, form, config) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;

}

function hideError(input, form, config) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
}

enableValidation(config);