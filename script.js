const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const form = document.querySelector('.popup__form');
const popupName = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__name');
const popupProfession = document.querySelector('.popup__input_type_profession');
const profileProfession = document.querySelector('.profile__profession');


function openPopup() {
    popup.classList.add('popup__open')
    popupName.value = profileName.textContent;
    popupProfession.value = profileProfession.textContent;
}

editButton.addEventListener('click', openPopup)


function closePopup() {
    popup.classList.remove('popup__open')
}

popupCloseButton.addEventListener('click', closePopup)

function submitForm(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileProfession.textContent = popupProfession.value;
    closePopup();
}

form.addEventListener('submit', submitForm)