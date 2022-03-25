export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_error',
    submitButtonSelector: '.popup__button',
    submitButtonErrorClass: 'popup__button_invalid',
}

export const popups = document.querySelectorAll('.popup')
export const profilePopupElement = document.querySelector('.popup_edit-profile')
export const editButton = document.querySelector('.profile__edit-button')
export const popupAddElement = document.querySelector('.popup_add-element')
export const addButton = document.querySelector('.profile__add-button')
export const popupFormEditProfile = document.querySelector('.popup__form_edit-profile') // fixed, old - .popup__form
export const popupName = document.querySelector('.popup__input_type_name')
export const profileName = '.profile__name';
export const popupProfession = document.querySelector('.popup__input_type_profession')
export const profileProfession = '.profile__profession'
export const popupImageBig = document.querySelector('.popup_big')
export const elements = document.querySelector('.elements') //выбирает ближайший к темплейту элемент
export const template = document.querySelector('.template').content // берет контент темплейта
export const formValidators = {}
export const initialCards = [{
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