class UserInfo {
    constructor(nameSelector, descriptionSelector) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
    }

    getUserInfo() {
        return this._userInfo = {
            name: this._name.textContent,
            description: this._description.textContent
        }
    };

    setUserInfo(name, profession) {
        this._name.textContent = name
        this._description.textContent = profession
        const formName = document.querySelector("form").getAttribute("name");
        return formName
    }

}

export default UserInfo