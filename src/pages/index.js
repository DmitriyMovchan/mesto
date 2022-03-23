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
    formValidators
} from '../utils/constants.js'

let idUser

api.getProfile()
    .then(res => {

        userInfo.setUserInfo(res.name, res.about)
        idUser = res._id
            // console.log(idUser)
    });


api.getInitialCards()
    .then(cardLists => {
        cardLists.forEach(data => {
            const title = data.name // меняем значение title на введеное в карточке
            const link = data.link // меняем значение Link на введеное в карточке
                //console.log(data)
            const item = {
                name: title,
                link: link,
                likes: data.likes,
                _id: data._id,
                idUser: idUser,
                owner: data.owner
            }

            //console.log(item)
            cardList.addCard(item)
        });
    })


// создание экземпляров классов


const popupDeleteConfirm = document.querySelector('.popup_delete-confirm')

//const cardList = new Section(elements, [], {
//   renderer: (data) => {
//      cardList.addItem(createCard(data));
//  }
//});

const cardList = new Section(elements, [], renderer)
const popupProfile = new PopupWithForm(profilePopupElement, handleProfileFormSubmit);
const addPopup = new PopupWithForm(popupAddElement, handleCardFormSubmit);
const popupWithImage = new PopupWithImage(popupImageBig);
const userInfo = new UserInfo(profileName, profileProfession)
const confirmPopup = new PopupWithForm(popupDeleteConfirm, () => {
    //console.log('qqqq')
    api.deleteCard(id)
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
                            console.log(res)
                            card.setLikes(res.likes)
                        })
                } else {
                    api.addLike(id)
                        .then(res => {
                            //console.log(res)
                            card.setLikes(res.likes)
                        })
                }


            })
        //console.log(card)
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
    //console.log(inputValues)
    const title = inputValues.name // меняем значение title на введеное в карточке
    const link = inputValues.description // меняем значение Link на введеное в карточке
    const item = {
        name: title,
        link: link,
    }

    api.addCard(item)
        .then(res => {
            // console.log('res', res)
            cardList.prependCard(res)
        })
        // cardList.prependCard(item)
}

function handleProfileFormSubmit(inputValues) {
    api.editProfile(inputValues.name, inputValues.profession)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about);
        })
}
const deletePopup = document.querySelector('.popup__button-delete')

function handleDeleteClick(id) {
    // console.log(id)
    confirmPopup.openPopup()
    confirmPopup.changeSubmitHandler(() => {
        api.deleteCard(id)
            .then(res => {
                document.querySelector(`.element[data-id="${id}"]`).remove();
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




/*function updateLikeButtonState(card) {
    console.log(card)
    const el = document.querySelector(`.element[data-id="${card._id}"] .mask-group__group_heard`);
    console.log(el)
        //const likeCount = card.likes.length || 0;
    const likeCount = document.querySelector('.mask-group__group_count');
    likeCount.textContent = card.likes.length || 0;
    console.log(card)
    const myLike = card.likes.find(x => x._id === '3f8a3377aa43fb02254f2a2b');
    if (myLike) el.classList.add("mask-group__group_heard_black");
    else el.classList.remove("mask-group__group_heard_black");
}

function handelLikeclick(id) {
    const myLike = document.querySelector(`.element[data-id="${id}"] .mask-group__group_heard`).classList.contains("mask-group__group_heard_black");;
    if (myLike) {
        api.deleteLike(id)
            .then(res => {
                console.log(res)
                updateLikeButtonState(res);
            })
    } else {
        api.addLike(id)
            .then(res => {
                console.log(res)
                updateLikeButtonState(res);
            })
    }
} */