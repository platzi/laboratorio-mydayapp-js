import ToDo from "./addToDom";
import RegisterStorage from "./registerStorage";

let toDo = new ToDo();
let registerStorage = new RegisterStorage();
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
      registerStorage.registerTask("mydayapp-js", event.srcElement.value);
      toDo.clearInput(event.srcElement);
    }
  }
}
