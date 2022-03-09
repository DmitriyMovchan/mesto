class UserInfo {
    constructor(nameSelector, descriptionSelector) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
    }

    // возвращает объект с введенными значениями в форме
    getUserInfo() {
        return this._userInfo = {
            name: this._name.textContent,
            description: this._description.textContent
        }
    };

    // меняет значение формы
    setUserInfo(name, profession) {
        this._name.textContent = name
        this._description.textContent = profession

    }

}

export default UserInfo