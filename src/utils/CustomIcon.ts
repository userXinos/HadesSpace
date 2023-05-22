export default class CustomIcon {
    private readonly _name: string;

    constructor(name: string) {
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
