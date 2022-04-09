export default class CustomIcon {
    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }


    // маскировка под String
    includes() {
        return false;
    }
}
