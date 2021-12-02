export default class {
    _startTime = 0;

    constructor() {
        this._startTime = new Date().getTime();
    }

    get final() {
        return (new Date().getTime() - this._startTime) / 1000;
    }
}
