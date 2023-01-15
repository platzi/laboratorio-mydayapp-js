export default class RegisterStorage {
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
}
