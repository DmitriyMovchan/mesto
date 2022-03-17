class Card {
    constructor(item, template, handleCardClick, handleDeleteClick) {
        this._item = item;
        this._view = template.querySelector('.element').cloneNode(true);
        this._remove = this._remove.bind(this);
        this._cardImage = this._view.querySelector('.element__image');
        this._handleCardClick = handleCardClick;
        this._buttonDelete = this._view.querySelector('.element__delete');
        this._likeCountView = this._view.querySelector('.mask-group__count');
        this._handleDeleteClick = handleDeleteClick;
        this._id = item.id;
    }

    // удаляет карточку
    _remove = () => {
        this._view.remove();
    }

    // навешивает/убирает класс сердечку
    _toggleHeart(event) {
        event.target.classList.toggle('mask-group__heard_black');
    }

    _deleteCard() {
        this._buttonDelete.addEventListener('click', this._remove);
    }

    _setEventListeners() {
        this._view.querySelector('.mask-group__heard').addEventListener('click', this._toggleHeart);
        this._buttonDelete.addEventListener('click', () => {
                this._handleDeleteClick(this._id);

            })
            //this._buttonDelete.addEventListener('click', this._remove);
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._item.name, this._item.link)
        });
    }

    /* слушатель клика на все кнопки карточки
    _setEventListeners() {
        this._view.querySelector('.mask-group__heard').addEventListener('click', this._toggleHeart);
        //this._buttonDelete.addEventListener('click', this._remove);
        this._buttonDelete.addEventListener('click', () => {
            this._handleDeleteClick()
        })
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._item.name, this._item.link)
        });
    } */



    // создание карточки и ее возврат
    render() {
        this._view.querySelector('.mask-group__description').textContent = this._item.name;
        this._cardImage.src = this._item.link;
        this._cardImage.alt = this._item.name;
        this._likeCountView.textContent = (this._item.likes && this._item.likes.length) || 0 //сюда как-то нужно передать likes массива от сервера
        this._setEventListeners();




        return this._view;
    }
}

export default Card;