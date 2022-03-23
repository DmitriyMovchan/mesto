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
        //console.log(this._view)
    }

    // удаляет карточку
    _remove = () => {
        this._view.remove();
    }

    // навешивает/убирает класс сердечку
    _fillLike(newLikes) {
        this._likes = newLikes
        this._view.querySelector('.mask-group__group_heard').classList.add('mask-group__group_heard_black');
        // console.log(this._view)

    }

    _unfill(newLikes) {
        this._likes = newLikes
        this._view.querySelector('.mask-group__group_heard').classList.remove('mask-group__group_heard_black');
        // console.log(this._view)

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
            //console.log(this._likes)
        this._likeCountView.textContent = (this._item.likes && this._item.likes.length) || 0;
        //как раньше искал лайки this._item.likes && this._item.likes.length

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


/* class Card {
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
         //console.log(this._view)
     }
 
     // удаляет карточку
     _remove = () => {
         this._view.remove();
     }
 
     // навешивает/убирает класс сердечку
     toggleHeart(newLikes) {
         this._likes = newLikes
         this._view.querySelector('.mask-group__group_heard').classList.toggle('mask-group__group_heard_black');
         // console.log(this._view)
 
     }
 
     updateLikeButtonState() {
         const card = this._item;
         const el = this._view.querySelector(`.element[data-id="${card._id}"] .mask-group__group_heard`);
         console.log(el)
             //const likeCount = card.likes.length || 0;
         const likeCountEl = this._view.querySelector('.mask-group__group_count');
         likeCountEl.textContent = (card.likes && card.likes.length) || 0;
         const myLike = card.likes.find(x => x._id === '3f8a3377aa43fb02254f2a2b');
         if (myLike) el.classList.add("mask-group__group_heard_black");
         else el.classList.remove("mask-group__group_heard_black");
     }
 
     _setEventListeners() {
         this._view.querySelector('.mask-group__group_heard').addEventListener('click', () => {
             console.log('zzzz')
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
             //console.log(this._likes)
             //this._likeCountView.textContent = (this._item.likes && this._item.likes.length) || 0;
             //как раньше искал лайки this._item.likes && this._item.likes.length
 
         //if (this.isLiked()) {
         //    this.toggleHeart();
         //}
         this.updateLikeButtonState()
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
 
 export default Card; */