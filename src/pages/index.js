// импорт классов
import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Popup from '../components/Popup.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import '../pages/index.css';

// импорт констант
import {
    config,
    popups,
    profilePopupElement,
    editButton,
    popupAddElement,
    addButton,
    popupFormEditProfile,
    popupName,
    profileName,
    popupProfession,
    profileProfession,
    popupImageBig,
    elements,
    template,
    initialCards,
    formValidators
} from '../utils/constants.js'

// создание экземпляров классов
const cardList = new Section(elements, initialCards, renderer)
const popupProfile = new PopupWithForm(profilePopupElement, (inputValues) => {
    userInfo.setUserInfo(inputValues.name, inputValues.profession);
})
const editPopup = new PopupWithForm(popupAddElement, handleCardFormSubmit)
const popupWithImage = new PopupWithImage(popupImageBig);
const userInfo = new UserInfo(profileName, profileProfession)

// отрисовка карточки на странице
function renderer(item) {
    const card = new Card(item, template, handleCardClick)
    return card.render()
}

// слушатель клика кнопки профайла
editButton.addEventListener('click', () => {
    const { name, description } = userInfo.getUserInfo()
    popupName.value = name;
    popupProfession.value = description
    const formName = popupFormEditProfile.getAttribute("name");
    formValidators[formName].resetValidation();
    popupProfile.openPopup();
})


// слушатель клика кнопки добавления карточки
addButton.addEventListener('click', () => {
    const formName = popupAddElement.querySelector("form").getAttribute("name");
    formValidators[formName].resetValidation();
    editPopup.openPopup();
})

// вызов ф-ии слушателей
editPopup.setEventListeners();
popupProfile.setEventListeners();
popupWithImage.setEventListeners();

function handleCardFormSubmit(inputValues) {
    const title = inputValues.name // меняем значение title на введеное в карточке
    const link = inputValues.description // меняем значение Link на введеное в карточке
    const item = {
        name: title,
        link: link,
    }
    cardList.prependCard(item)

}
window.addEventListener('load', () => { // ф-я плавного открытия/закрытия попапа
    popups.forEach((popup) => popup.classList.add('popup_transition'))
})

function handleCardClick(popupTitle, popupImage) {
    popupWithImage.openPopup(popupTitle, popupImage);
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