export default class Storage {
  constructor() {}

  init() {}

  registerTask(key, text) {
    let storage = this.getStorage(key);
    let newIndex = this.getNewIndex(storage);
    this.addNewItem(storage, newIndex, text, key);
    return newIndex;
  }

  getNewIndex(value) {
    if (value === undefined || value === null) return 1;
    if (value.length == 0) return 1;
    value.sort((a, b) => {
      return a.id - b.id;
    });
    return value[value.length - 1].id + 1;
  }

  getStorage(key) {
    let array = localStorage.getItem(key);
    if (array === undefined || array === null) return [];
    return JSON.parse(localStorage.getItem(key));
  }

  getPending(key) {
    return this.getStorage(key).filter((item) => {
      return item.completed == false;
    });
  }

  getCompleted(key) {
    return this.getStorage(key).filter((item) => {
      return item.completed == true;
    });
  }

  addNewItem(storage, index, value, key) {
    let newItem = {
      id: index,
      title: value.trim(),
      completed: false,
    };
    storage.push(newItem);
    let itemToStorage = JSON.stringify(storage);
    localStorage.setItem(key, itemToStorage);
  }

  getItemLeft(key) {
    let itemsLeft = this.getStorage(key);
    if (!itemsLeft) return 0;
    return itemsLeft.length;
  }

  getItemCompleted(key) {
    let itemsLeft = this.getStorage(key);
    if (!itemsLeft) return 0;
    return itemsLeft.filter((item) => item.completed == true).length;
  }

  updateStateItem(key, id, state, text) {
    let storage = this.getStorage(key);
    storage.forEach((element) => {
      if (element.id == id) {
        element.completed = state === undefined ? element.completed : state;
        element.title = text === undefined ? element.title : text.trim();
      }
    });
    let itemToStorage = JSON.stringify(storage);
    localStorage.setItem(key, itemToStorage);
  }

  removeCompletedItems(key) {
    let storage = this.getStorage(key);
    let filterArray = storage.filter((item) => {
      return item.completed != true;
    });
    let itemToStorage = JSON.stringify(filterArray);
    localStorage.setItem(key, itemToStorage);
  }
}
