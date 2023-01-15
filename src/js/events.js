import ToDo from "./addToDom";
import Storage from "./Storage";
import Accounts from "./accounts";

let toDo = new ToDo();
let storage = new Storage();
let accounts = new Accounts();
export default class Events {
  constructor() {}

  init() {
    this.toDoInput = document.querySelector(".new-todo");
    this.registerEvents();
  }

  registerEvents() {
    if (this.toDoInput) {
      this.toDoInput.addEventListener("keydown", this.keyDownEvent);
    }
  }

  keyDownEvent(event) {
    if (event.which === 13) {
      toDo.addToDoToDom(event.srcElement.value);
      storage.registerTask("mydayapp-js", event.srcElement.value);
      toDo.clearInput(event.srcElement);
      accounts.refreshAccounts("mydayapp-js");
    }
  }
}
