class Card {
    constructor(item, template, handleCardClick, handleDeleteClick, idUser, handelLikeclick) {
        this._item = item;
        this._view = template.querySelector('.element').cloneNode(true);
        this._remove = this._remove.bind(this);
        this._cardImage = this._view.querySelector('.element__image');
        this._handleCardClick = handleCardClick;
        this._buttonDelete = this._view.querySelector('.element__delete');
        this._likeCountView = this._view.querySelector('.mask-group__group_count');
        this._handleDeleteClick = handleDeleteClick;
        this._id = item._id;
        this._userId = idUser;
        this._owner = item.owner;
        this._handelLikeclick = handelLikeclick;
    }

    // удаляет карточку
    _remove = () => {
        this._view.remove();
    }

    // навешивает/убирает класс сердечку
    _fillLike(newLikes) {
        this._likes = newLikes
        this._view.querySelector('.mask-group__group_heard').classList.add('mask-group__group_heard_black');

    }

    _unfill(newLikes) {
        this._likes = newLikes
        this._view.querySelector('.mask-group__group_heard').classList.remove('mask-group__group_heard_black');
    }

    _setEventListeners() {
        this._view.querySelector('.mask-group__group_heard').addEventListener('click', () => {
            this._handelLikeclick(this._id)
        });
        this._buttonDelete.addEventListener('click', () => {
            this._handleDeleteClick(this._id);
        })
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._item.name, this._item.link)
        });
    }

    isLiked() {
        const userHasLikedCard = this._item.likes.find(user => user._id === this._userId);
        return userHasLikedCard
    }

    setLikes(newLikes) {
        this._item.likes = newLikes
        this._likeCountView.textContent = (this._item.likes && this._item.likes.length) || 0;

        if (this.isLiked()) {
            this._fillLike()
        } else {
            this._unfill()
        }
    }

    // создание карточки и ее возврат
    render() {
        if (!this._owner || (this._userId !== this._owner._id)) {
            this._buttonDelete.style.display = 'none';
        }
        this._view.querySelector('.mask-group__description').textContent = this._item.name;
        this._cardImage.src = this._item.link;
        this._cardImage.alt = this._item.name;
        this._view.setAttribute("data-id", this._id);
        this.setLikes(this._item.likes);

        this._setEventListeners();
        return this._view;
    }
}

export default Card;