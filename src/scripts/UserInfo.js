class UserInfo {
    constructor(name, description) {
        this._name = name
        this._description = description
    }

    getUserInfo() {
        return this._userInfo = {
            name: this._name,
            description: this._description
        }
    };

    setUserInfo(popupName, popupProfession) {
        popupName.value = this.getUserInfo().name.textContent
        popupProfession.value = this.getUserInfo().description.textContent
        const formName = document.querySelector("form").getAttribute("name");
        return formName
    }

}

export default UserInfo