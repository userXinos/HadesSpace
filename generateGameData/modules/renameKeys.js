export default function renameKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return {[newKey]: obj[key]};
  });
  return Object.assign({}, ...keyValues);
}
