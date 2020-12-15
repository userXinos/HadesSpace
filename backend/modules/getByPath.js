export default function(obj, arr) {
  for (let i = 0; i < arr.length; i++) {
    let key = arr[i];

    if (key in obj) {
      obj = obj[key];
    } else { // игнор регистра ключа-аргумента
      key = Object.keys(obj)
          .find((k) => k.toLowerCase() === key.toLowerCase());
      if (key) {
        obj = obj[key];
      } else {
        return null;
      }
    }
  }
  return obj;
}
