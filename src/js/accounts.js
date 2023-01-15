import Storage from "./Storage";

let storage = new Storage();
export default class Accounts {
  constructor() {}

  init() {}

  refreshAccounts(key) {
    let newItems = storage.getItemLeft(key);
    let domItemLeftSpan = document.querySelector(".todo-count");
    if (domItemLeftSpan) {
      let itemValue = newItems > 1 ? "items" : "item";
      domItemLeftSpan.innerHTML = `<strong>${newItems}</strong> ${itemValue} left`;
    }
  }
}
