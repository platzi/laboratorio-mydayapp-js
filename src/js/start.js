import {
  keyDownEvent,
  clearCompletedEvent,
  loadToDoList,
} from "./manageDom.js";
export default class Start {
  constructor() {}

  init() {
    this.toDoList = document.querySelector(".todo-list");
    this.updateTask();
    this.registerMainEvent();
  }

  updateTask() {
    loadToDoList();
  }

  registerMainEvent() {
    const toDoInput = document.querySelector(".new-todo");
    if (toDoInput) {
      toDoInput.addEventListener("keydown", keyDownEvent);
    }

    const clearCompleted = document.querySelector(".clear-completed");
    if (clearCompleted) {
      clearCompleted.addEventListener("click", clearCompletedEvent);
    }
  }
}
