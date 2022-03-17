// импорт классов
import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Popup from '../components/Popup.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import { api } from '../components/Api.js'
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

api.getProfile()
    .then(res => {
        userInfo.setUserInfo(res.name, res.about)
    });


api.getInitialCards()
    .then(cardLists => {
        cardLists.forEach(data => {
            const title = data.name // меняем значение title на введеное в карточке
            const link = data.link // меняем значение Link на введеное в карточке
            const item = {
                name: title,
                link: link,
                likes: data.likes,
                id: data._id
            }
            cardList.addCard(item)
        });
    })


// создание экземпляров классов


const popupDeleteConfirm = document.querySelector('.popup_delete-confirm')

const cardList = new Section(elements, [], renderer)
const popupProfile = new PopupWithForm(profilePopupElement, handleProfileFormSubmit);
const addPopup = new PopupWithForm(popupAddElement, handleCardFormSubmit);
const popupWithImage = new PopupWithImage(popupImageBig);
const userInfo = new UserInfo(profileName, profileProfession)
const confirmPopup = new PopupWithForm(popupDeleteConfirm, () => {
    api.deleteCard(id)
})



// отрисовка карточки на странице
function renderer(item) {
    const card = new Card(item, template, handleCardClick, handleDeleteClick)
    api.addCard(item.name, item.link, item.likes, item.id)
        .then(res => {
            console.log('res', res)
        })
    return card.render()
}

// слушатель клика кнопки профайла
editButton.addEventListener('click', () => {
    //console.log(editButton)
    const { name, description } = userInfo.getUserInfo()
    popupName.value = name;
    popupProfession.value = description
    const formName = popupFormEditProfile.getAttribute("name");
    formValidators[formName].resetValidation();
    popupProfile.openPopup();
    api.getProfile()
        .then(res => {
            userInfo.setUserInfo(res.name, res.about)
        });

})

// слушатель клика кнопки добавления карточки
addButton.addEventListener('click', () => {
    const formName = popupAddElement.querySelector("form").getAttribute("name");
    formValidators[formName].resetValidation();
    addPopup.openPopup();
})

// вызов ф-ии слушателей

popupProfile.setEventListeners();
popupWithImage.setEventListeners();
confirmPopup.setEventListeners();
addPopup.setEventListeners();




function handleCardFormSubmit(inputValues) {
    const title = inputValues.name // меняем значение title на введеное в карточке
    const link = inputValues.description // меняем значение Link на введеное в карточке
    const item = {
        name: title,
        link: link,
    }
    cardList.prependCard(item)
}

function handleProfileFormSubmit(inputValues) {
    api.editProfile(inputValues.name, inputValues.profession)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about);
        })
}

function handleDeleteClick(id) {
    confirmPopup.openPopup()
    confirmPopup.changeSubmitHandler(() => {
        api.deleteCard(id)
            .then(res => {
                //const viwe = template.querySelector('.element')
                //const idCard = document.getElementById(id)
                //viwe.remove(id)
                console.log(res)

            })
    })

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