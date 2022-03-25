class UserInfo {
    constructor(nameSelector, descriptionSelector, profileAvatarSelector) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(profileAvatarSelector)
    }

    // возвращает объект с введенными значениями в форме
    getUserInfo() {
        return this._userInfo = {
            name: this._name.textContent,
            description: this._description.textContent,
            avatar: this._avatar
        }
    };

    // меняет значение формы
    setUserInfo(name, profession, avatar) {
        console.log('zzzz')
        this._name.textContent = name;
        this._description.textContent = profession;
        this._avatar.src = avatar
    }

}

export default UserInfo