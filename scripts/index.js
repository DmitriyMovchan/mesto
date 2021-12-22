import CardsList from './CardsList.js'
import FormValidator from './FormValidator.js'

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_error',
    submitButtonSelector: '.popup__button',
    submitButtonErrorClass: 'popup__button_invalid',
}

const popups = document.querySelectorAll('.popup')
const inputs = document.querySelectorAll('.popup__input')
const forms = document.querySelectorAll('.popup__form')
const profilePopupElement = document.querySelector('.popup_edit-profile')
const editButton = document.querySelector('.profile__edit-button')
const popupAddElement = document.querySelector('.popup_add-element')
const addButton = document.querySelector('.profile__add-button')
const addCardForm = document.querySelector('.popup__form_add-element')
const popupFormEditProfile = document.querySelector('.popup__form_edit-profile') // fixed, old - .popup__form
const popupFormAddElement = document.querySelector('.popup__form_add-element')

const popupName = document.querySelector('.popup__input_type_name')
const profileName = document.querySelector('.profile__name')
const popupProfession = document.querySelector('.popup__input_type_profession')
const profileProfession = document.querySelector('.profile__profession')
const popupInputTypeTitle = document.querySelector('.popup__input_type_title')
const popupInputTypeLink = document.querySelector('.popup__input_type_link')
const popupImageBig = document.querySelector('.popup_big')
const popupImage = document.querySelector('.popup__image')
const popupTitle = document.querySelector('.popup__title')
const elements = document.querySelector('.elements') //выбирает ближайший к темплейту элемент
const template = document.querySelector('.template').content // берет контент темплейта
const initialCards = [{
        // массив карточек "из коробки"
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    },
]

const cardList = new CardsList(elements, initialCards, createCard)

function createCard(item) {
    const card = new Card(item, template, handleCardClick)
    return card
}

export function openPopup(popup) {
    popup.classList.add('popup_open') // добавление класса
    document.addEventListener('keydown', closeByEscape);
}

import Card from './Card.js'

function closePopup(popup) {
    popup.classList.remove('popup_open') // удаляет класс
    document.removeEventListener('keydown', closeByEscape)
}

editButton.addEventListener('click', () => {
    popupName.value = profileName.textContent
    popupProfession.value = profileProfession.textContent
    const formName = profilePopupElement.querySelector("form").getAttribute("name");
    formValidators[formName].resetValidation();
    openPopup(profilePopupElement)
})

addButton.addEventListener('click', () => {
    popupInputTypeTitle.value = '';
    popupInputTypeLink.value = '';
    const formName = popupAddElement.querySelector("form").getAttribute("name");
    formValidators[formName].resetValidation();
    openPopup(popupAddElement)
})

popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
        if (
            event.target.classList.contains('popup_open') ||
            event.target.classList.contains('popup__close')
        ) {
            closePopup(popup)
        }
    })
})

function submitProfileForm(event) {
    event.preventDefault() // не дает отправить данные на сервер
    profileName.textContent = popupName.value // меняет значение имени
    profileProfession.textContent = popupProfession.value //меняет значение фамилии
    closePopup(profilePopupElement) // закрывает попап при введении
}

function submitAddElement(event) {
    // ф-я добавления карточек
    event.preventDefault()
    const title = popupInputTypeTitle.value // меняем значение title на введеное в карточке
    const link = popupInputTypeLink.value // меняем значение Link на введеное в карточке
    const item = {
        name: title,
        link: link,
    }
    event.target.reset()
    prependCard(item)
    closePopup(popupAddElement) // закрываем попап добавления
}
window.addEventListener('load', () => {
    // ф-я плавного открытия/закрытия попапа
    popups.forEach((popup) => popup.classList.add('popup_transition'))
})

function handleCardClick(name, link) {
    popupImage.src = link; // берем ссылку на этот элемент из массива
    popupImage.alt = name; // замена alt
    openPopup(popupImageBig);
}

popupFormEditProfile.addEventListener('submit', submitProfileForm) //слушает введение данных в форму изменения профайла
popupFormAddElement.addEventListener('submit', submitAddElement) //слушает введение данных в форму добавления карточек

initialCards.forEach((item) => {
        cardList.addCard(item)
    }) //обработка массива

function prependCard(item) {
    // ф-я добавления на страницу новых карточек в начало.
    const element = createCard(item).render()
    elements.prepend(element);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_open')
        closePopup(openedPopup)
    }
}

//const formValidator = new FormValidator(config)
//console.log(formValidator)
//formValidator.enableValidation();

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(formElement, config)
        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};


enableValidation(config);