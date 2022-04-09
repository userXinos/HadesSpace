/**
 * using array methods with an object
 * @param {Object} obj
 * @param {Object.<String, Function>} callbacks - where key - function name from Array.prototype
 * @return {Object}
 */
export default function(obj, callbacks) {
    let entries = Object.entries(obj);

    for (const key in callbacks) {
        if (Object.prototype.hasOwnProperty.call(callbacks, key)) {
            entries = Array.prototype[key].call(entries, callbacks[key]);
        }
    }

    return Object.fromEntries(entries);
}
