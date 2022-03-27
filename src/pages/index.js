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
export function getMyId() {
    return userInfo._id;
}

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
    formValidators,
    popupDeleteConfirm,
    avatar,
    editButtonAvatar,
    profileAvatar,
    popupTypeAvatar,
    popupFormEditAvatar
} from '../utils/constants.js'

let idUser

Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([userData, cardLists]) => {
        userInfo.setUserInfo(userData.name, userData.about, userData.avatar)
        idUser = userData._id;

        cardList.renderItems(cardLists, idUser);
        /*cardLists.forEach(data => {
            const title = data.name // меняем значение title на введеное в карточке
            const link = data.link // меняем значение Link на введеное в карточке
            const item = {
                name: title,
                link: link,
                likes: data.likes,
                _id: data._id,
                idUser: idUser,
                owner: data.owner
            }
            cardList.addCard(item)
        })*/
    })
    .catch(console.log);


/* api.getProfile()
    .then(res => {
        userInfo.setUserInfo(res.name, res.about, res.avatar)
        idUser = res._id
    })
    .catch(console.log);



api.getInitialCards()
    .then(cardLists => {
        cardLists.forEach(data => {
            const title = data.name // меняем значение title на введеное в карточке
            const link = data.link // меняем значение Link на введеное в карточке
            const item = {
                name: title,
                link: link,
                likes: data.likes,
                _id: data._id,
                idUser: idUser,
                owner: data.owner
            }
            cardList.addCard(item)
        })


        addPopup.closePopup()
    })
    .catch(console.log); */

// создание экземпляров классов
const cardList = new Section(elements, [], renderer)
const popupProfile = new PopupWithForm(profilePopupElement, handleProfileFormSubmit, 'Сохранение...');
const addPopup = new PopupWithForm(popupAddElement, handleCardFormSubmit, 'Сохранение...');
const popupWithImage = new PopupWithImage(popupImageBig);
const popupEditAvatar = new PopupWithForm(avatar, (inputValues) => {
    return api.updateAvatar(inputValues.avatar)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about, res.avatar)
        });
}, 'Сохранение...')
const userInfo = new UserInfo(profileName, profileProfession, profileAvatar)
const confirmPopup = new PopupWithForm(popupDeleteConfirm, null, 'Удаление...')

editButtonAvatar.addEventListener('click', () => {
    const formName = popupFormEditAvatar.getAttribute("name");
    formValidators[formName].resetValidation();
    popupEditAvatar.openPopup()
})

// отрисовка карточки на странице
function renderer(item) {
    const card = new Card(item,
        template,
        handleCardClick, handleDeleteClick,
        idUser,
        (id) => {
            console.log(id)
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
                    .catch(console.log)
            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
                    .catch(console.log)
            }
        })
    return card.render()
}

// слушатель клика кнопки профайла
editButton.addEventListener('click', () => {
    const { name, description } = userInfo.getUserInfo()
    popupName.value = name;
    popupProfession.value = description;
    const formName = popupFormEditProfile.getAttribute("name");
    formValidators[formName].resetValidation();
    popupProfile.openPopup();
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
popupEditAvatar.setEventListeners();

function handleCardFormSubmit(inputValues) {
    const title = inputValues.name // меняем значение title на введеное в карточке
    const link = inputValues.description // меняем значение Link на введеное в карточке
    const item = {
        name: title,
        link: link,
    }

    return api.addCard(item)
        .then(res => {
            cardList.prependCard(res)
                //if (onThen) onThen(res);
        })
}

function handleProfileFormSubmit(inputValues) {
    return api.editProfile(inputValues.name, inputValues.profession)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about, res.avatar);
        })
}

function handleDeleteClick(id) {
    confirmPopup.openPopup()
    confirmPopup.changeSubmitHandler((INPUTvALUES) => {
        return api.deleteCard(id)
            .then(res => {
                return document.querySelector(`.element[data-id="${id}"]`).remove();
            })
            /*.catch((obj) => {
                return Promise.reject(obj)
            });*/
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