const profilePopupElement = document.querySelector('.popup_edit-profile')
const editButton = document.querySelector('.profile__edit-button');
const popupAddElement = document.querySelector('.popup_add-element');
const addButton = document.querySelector('.profile__add-button');
const popupCloseEditProfile = document.querySelector('.popup__close_edit-profile');
const popupCloseAddElement = document.querySelector('.popup__close_add-element');
const popupCloseBigImage = document.querySelector('.popup__close_big-image');
const popupFormEditProfile = document.querySelector('.popup__form');
const popupFormAddElement = document.querySelector('.popup__form_add-element');
const popupName = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__name');
const popupProfession = document.querySelector('.popup__input_type_profession');
const profileProfession = document.querySelector('.profile__profession');
const popupInputTypeTitle = document.querySelector('.popup__input_type_title');
const popupInputTypeLink = document.querySelector('.popup__input_type_link');
const popupImageBig = document.querySelector('.popup_big');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__title');
const elements = document.querySelector('.elements'); //выбирает ближайший к темплейту элемент
const template = document.querySelector('.template').content; // берет контент темплейта
const initialCards = [{ // массив карточек "из коробки"
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function openPopup(popup) { //открывает попап
    popup.classList.add('popup_open') // добавление класса

}

function closePopup(popup) { // закрывает попап
    popup.classList.remove('popup_open') // удаляет класс
}

editButton.addEventListener('click', () => { //слушатель нажатия на кнопу изменения профайла
    openPopup(profilePopupElement);
    popupName.value = profileName.textContent;
    popupProfession.value = profileProfession.textContent;
});


addButton.addEventListener('click', () => openPopup(popupAddElement)); //слушатель нажатия на кнопу изменения профайла

popupCloseEditProfile.addEventListener('click', () => closePopup(profilePopupElement)); // слушатель при нажатии на крестик закрывает форму
popupCloseAddElement.addEventListener('click', () => closePopup(popupAddElement)); // слушатель при нажатии на крестик закрывает форму


function submitProfileForm(event) { // 
    event.preventDefault(); // не дает отправить данные на сервер
    profileName.textContent = popupName.value; // меняет значение имени
    profileProfession.textContent = popupProfession.value; //меняет значение фамилии
    closePopup(profilePopupElement); // закрывает попап при введении
}

function submitAddElement(event) { // ф-я добавления карточек
    event.preventDefault();
    const title = popupInputTypeTitle.value; // меняем значение title на введеное в карточке
    const link = popupInputTypeLink.value; // меняем значение Link на введеное в карточке
    const item = {
        name: title,
        link: link
    }
    event.target.reset();
    prependCard(item); // добавляем карточку в начало
    closePopup(popupAddElement); // закрываем попап добавления
}
window.addEventListener('load', () => { // ф-я плавного открытия/закрытия попапа
    document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_transition'))
})

popupFormEditProfile.addEventListener('submit', submitProfileForm) //слушает введение данных в форму изменения профайла
popupFormAddElement.addEventListener('submit', submitAddElement) //слушает введение данных в форму добавления карточек




initialCards.forEach(appendCards); //обработка массива

function createCard(item) { //ф-я переработчик массива
    const element = template.querySelector('.element').cloneNode(true); // клонируем элемент в template
    element.querySelector('.mask-group__description').textContent = item.name; // меняем имя на имя в массиве
    element.querySelector('.element__image').src = item.link; // меняем ссылку на ссылку в массиве
    element.querySelector('.element__image').alt = item.name; // меняем альт картинки на имя из массива
    element.querySelector('.element__delete').addEventListener('click', (event) => { // слушаем клик по кнопке удаления элемента
        event.target.closest('.element').remove(); // удаляем элемент
    });
    element.querySelector('.mask-group__heard').addEventListener('click', (event) => { // слушаем клик по кнопке лайка
        event.target.classList.toggle('mask-group__heard_black'); // добавляем/удаляем класс черного сердца
    });

    element.querySelector('.element__image').addEventListener('click', (event) => { // слушаем клик по картинке элемента
        popupImage.src = event.target.src; // берем ссылку на этот элемент из массива, а alt поменял на 104 строке
        openPopup(popupImageBig); // открываем попап с большой картинкой
        popupCloseBigImage.addEventListener('click', () => closePopup(popupImageBig)); // слушатель при нажатии на крестик закрывает форму
    });

    return element; //возвращаем блок элемента
}

function appendCards(item) { //ф-я добавления на страницу карточки из коробки
    const element = createCard(item); // создает карточку
    elements.append(element); // добавление карточки
}

function prependCard(item) { // ф-я добавления на страницу новых карточек в начало.
    const element = createCard(item);
    elements.prepend(element);
}