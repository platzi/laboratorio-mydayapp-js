export default class Start {
  constructor() {}

  init() {
    this.toDoList = document.querySelector(".todo-list");
    this.updateTask();
  }

  updateTask() {
    this.toDoList.innerHTML = "";
  }
}
