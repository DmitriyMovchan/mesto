import Section from './Section.js'
import FormValidator from './FormValidator.js'
import Card from './Card.js'
import Popup from './Popup.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_error',
    submitButtonSelector: '.popup__button',
    submitButtonErrorClass: 'popup__button_invalid',
}

const popups = document.querySelectorAll('.popup')
const profilePopupElement = document.querySelector('.popup_edit-profile')
const editButton = document.querySelector('.profile__edit-button')
const popupAddElement = document.querySelector('.popup_add-element')
const addButton = document.querySelector('.profile__add-button')
const popupFormEditProfile = document.querySelector('.popup__form_edit-profile') // fixed, old - .popup__form
const popupFormAddElement = document.querySelector('.popup__form_add-element')
const popupName = document.querySelector('.popup__input_type_name')
const profileName = document.querySelector('.profile__name')
const popupProfession = document.querySelector('.popup__input_type_profession')
const profileProfession = document.querySelector('.profile__profession')
const popupInputTypeTitle = document.querySelector('.popup__input_type_title')
const popupInputTypeLink = document.querySelector('.popup__input_type_link')
const popupImageBig = document.querySelector('.popup_big')
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

const cardList = new Section(elements, initialCards, renderer)
const popupProfile = new Popup(profilePopupElement)
const editPopup = new PopupWithForm(popupAddElement, submitCallback)

function renderer(item) {
    const card = new Card(item, template, handleCardClick)
    return card
}

editButton.addEventListener('click', () => {
    popupName.value = profileName.textContent
    popupProfession.value = profileProfession.textContent
    const formName = profilePopupElement.querySelector("form").getAttribute("name");
    formValidators[formName].resetValidation();
    popupProfile.openPopup(profilePopupElement);
    popupProfile.setEventListeners()
})

addButton.addEventListener('click', () => {
    popupInputTypeTitle.value = '';
    popupInputTypeLink.value = '';
    const formName = popupAddElement.querySelector("form").getAttribute("name");
    formValidators[formName].resetValidation();
    editPopup.openPopup(popupAddElement);
    editPopup.setEventListeners()
})

function submitProfileForm(event) {
    event.preventDefault() // не дает отправить данные на сервер
    profileName.textContent = popupName.value // меняет значение имени
    profileProfession.textContent = popupProfession.value //меняет значение фамилии
    popupProfile.closePopup(profilePopupElement) // закрывает попап при введении
}

function submitCallback() {
    // ф-я добавления карточек
    const title = popupInputTypeTitle.value // меняем значение title на введеное в карточке
    const link = popupInputTypeLink.value // меняем значение Link на введеное в карточке
    const item = {
        name: title,
        link: link,
    }
    prependCard(item)
    editPopup.closePopup(popupAddElement) // закрываем попап добавления
}
window.addEventListener('load', () => { // ф-я плавного открытия/закрытия попапа
    popups.forEach((popup) => popup.classList.add('popup_transition'))
})

function handleCardClick(popupTitle, popupImage) {
    const popupWithImage = new PopupWithImage(popupImageBig);
    popupWithImage.openPopup(popupTitle, popupImage);
    popupWithImage.setEventListeners()
}

popupFormEditProfile.addEventListener('submit', submitProfileForm) //слушает введение данных в форму изменения профайла
popupFormAddElement.addEventListener('submit', submitCallback) //слушает введение данных в форму добавления карточек

initialCards.forEach((item) => {
        cardList.addCard(item)
    }) //обработка массива

function prependCard(item) {
    // ф-я добавления на страницу новых карточек в начало.
    const element = renderer(item).render()
    elements.prepend(element)
}

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


//const popup1 = document.querySelector('.popup')
//const inputs = document.querySelectorAll('.popup__input')
//const forms = document.querySelectorAll('.popup__form')
//const addCardForm = document.querySelector('.popup__form_add-element')
//const popupImage = document.querySelector('.popup__image')
//const popupTitle = document.querySelector('.popup__title')

/* popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
        if (
            event.target.classList.contains('popup_open') ||
            event.target.classList.contains('popup__close')
        ) {
            popup.closePopup()
        }
    })
}) */

/*function openPopup(popup) {
    popup.classList.add('popup_open') // добавление класса
    document.addEventListener('keydown', closeByEscape);
}



function closePopup(popup) {
    popup.classList.remove('popup_open') // удаляет класс
    document.removeEventListener('keydown', closeByEscape)
} */

// popupImage.src = link; // берем ссылку на этот элемент из массива
// popupImage.alt = name; // замена alt
// popupTitle.textContent = name;
// popupWithImage.openPopup(popupImageBig);
// popupWithImage.setEventListeners()

/* function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_open')
        popup.closePopup(openedPopup)
    }
} */

//const formValidator = new FormValidator(config)
//console.log(formValidator)
//formValidator.enableValidation();