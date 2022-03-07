import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Popup from '../components/Popup.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import '../pages/index.css';

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
const profileName = '.profile__name'
const popupProfession = document.querySelector('.popup__input_type_profession')
const profileProfession = '.profile__profession'
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
const popupProfile = new PopupWithForm(profilePopupElement, (inputValues) => {
    userInfo.setUserInfo(inputValues.name, inputValues.profession);
})
const editPopup = new PopupWithForm(popupAddElement, handleCardFormSubmit)
const popupWithImage = new PopupWithImage(popupImageBig);
const userInfo = new UserInfo(profileName, profileProfession)

function renderer(item) {
    const card = new Card(item, template, handleCardClick)
    return card.render()
}

const formValidators = {}

editButton.addEventListener('click', () => {
    const { name, description } = userInfo.getUserInfo()
    popupName.value = name;
    popupProfession.value = description
    const formName = popupFormEditProfile.getAttribute("name");
    formValidators[formName].resetValidation();
    popupProfile.openPopup();
})

addButton.addEventListener('click', () => {
    popupInputTypeTitle.value = '';
    popupInputTypeLink.value = '';
    const formName = popupAddElement.querySelector("form").getAttribute("name");
    formValidators[formName].resetValidation();
    editPopup.openPopup();
})
editPopup.setEventListeners();
popupProfile.setEventListeners();
popupWithImage.setEventListeners();

function submitProfileForm(event) {
    event.preventDefault() // не дает отправить данные на сервер
    userInfo.setUserInfo(popupName.value, popupProfession.value)
    popupProfile.closePopup() // закрывает попап при введении
}

function handleCardFormSubmit(inputValues) {
    // ф-я добавления карточек
    const title = inputValues.name // меняем значение title на введеное в карточке
    const link = inputValues.description // меняем значение Link на введеное в карточке
    const item = {
        name: title,
        link: link,
    }
    prependCard(item)

}
window.addEventListener('load', () => { // ф-я плавного открытия/закрытия попапа
    popups.forEach((popup) => popup.classList.add('popup_transition'))
})

function handleCardClick(popupTitle, popupImage) {
    popupWithImage.openPopup(popupTitle, popupImage);
}

function prependCard(item) {
    // ф-я добавления на страницу новых карточек в начало.
    console.log('qqq')
    const element = renderer(item)
    elements.prepend(element)
}

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