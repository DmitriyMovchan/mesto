const body = document.querySelector('.body');
const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.popup_edit-button')
const editButton = document.querySelector('.profile__edit-button');
const popupAddElement = document.querySelector('.popup_add-element');
const addButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelectorAll('.popup__close');
const form = document.querySelectorAll('.popup__form');
const popupName = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__name');
const popupProfession = document.querySelector('.popup__input_type_profession');
const profileProfession = document.querySelector('.profile__profession');
const popupInputTypeTitle = document.querySelector('.popup__input_type_title');
const popupInputTypeLink = document.querySelector('.popup__input_type_link');
const popupImageBig = document.querySelector('.popup_big');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__title');


function openPopup(popup) { //открывает попап
    popup.classList.add('popup_open') // добавление класса
    popupName.value = profileName.textContent;
    popupProfession.value = profileProfession.textContent;
}

function closePopup(popup) { // закрывает попап
    popup.classList.remove('popup_open') // удаляет класс
}

editButton.addEventListener('click', () => openPopup(popupEditButton)); //слушатель нажатия на кнопу изменения профайла
addButton.addEventListener('click', () => openPopup(popupAddElement)); //слушатель нажатия на кнопу изменения профайла

popupCloseButton[0].addEventListener('click', () => closePopup(popupEditButton)); // слушатель при нажатии на крестик закрывает форму
popupCloseButton[1].addEventListener('click', () => closePopup(popupAddElement)); // слушатель при нажатии на крестик закрывает форму


function submitForm(event) { // 
    event.preventDefault(); // не дает отправить данные на сервер
    profileName.textContent = popupName.value; // меняет значение имени
    profileProfession.textContent = popupProfession.value; //меняет значение фамилии
    closePopup(popupEditButton); // закрывает попап при введении
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

form[0].addEventListener('submit', submitForm) //слушает введение данных в форму изменения профайла
form[1].addEventListener('submit', submitAddElement) //слушает введение данных в форму добавления карточек

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
const elements = document.querySelector('.elements'); //выбирает ближайший к темплейту элемент
const template = document.querySelector('.template').content; // берет контент темплейта


initialCards.forEach(appendCards); //обработка массива

function createCard(item) { //ф-я переработчик массива
    const element = template.querySelector('.element').cloneNode(true); // клонируем элемент в template
    element.querySelector('.mask-group__description').textContent = item.name; // меняем имя на имя в массиве
    element.querySelector('.element__image').src = item.link; // меняем ссылку на ссылку в массиве
    element.querySelector('.element__delete').addEventListener('click', (event) => { // слушаем клик по кнопке удаления элемента
        event.target.closest('.element').remove(); // удаляем элемент
    });
    element.querySelector('.mask-group__heard').addEventListener('click', (event) => { // слушаем клик по кнопке лайка
        event.target.classList.toggle('mask-group__heard_black'); // добавляем/удаляем класс черного сердца
    });

    element.querySelector('.element__image').addEventListener('click', (event) => { // слушаем клик по картинке элемента
        popupImage.src = event.target.src; // берем ссылку на этот элемент из массива
        openPopup(popupImageBig); // открываем попап с большой картинкой
        popupCloseButton[2].addEventListener('click', () => closePopup(popupImageBig)); // слушатель при нажатии на крестик закрывает форму
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