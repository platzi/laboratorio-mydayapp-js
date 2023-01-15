export default class Storage {
  constructor() {}

  init() {}

  registerTask(key, text) {
    let storage = this.getStorage(key);
    let newIndex = this.getNewIndex(storage);
    this.addNewItem(storage, newIndex, text, key);
  }

  getNewIndex(value) {
    if (value === undefined || value === null) return 1;
  }

  getStorage(key) {
    return localStorage.getItem(key);
  }

  addNewItem(storage, index, value, key) {
    let newItem = {
      id: index,
      title: value,
      completed: false,
    };
    if (storage === null) storage = [];
    else storage = JSON.parse(storage);
    storage.push(newItem);
    let itemToStorage = JSON.stringify(storage);
    localStorage.setItem(key, itemToStorage);
  }

  getItemLeft(key) {
    let itemsLeft = this.getStorage(key);
    if (!itemsLeft) return 0;
    itemsLeft = JSON.parse(itemsLeft);
    return itemsLeft.length;
  }
}
