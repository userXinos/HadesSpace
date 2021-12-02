
/* Основной объект для данных таблицы */
export default class JsonRaw {
    constructor(data, metadata = {}) {
        this.data = data;
        this.metadata = metadata;
    }
}
