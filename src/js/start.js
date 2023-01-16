import {
  keyDownEvent,
  clearCompletedEvent,
  loadToDoList,
  urlControl,
} from "./manageDom.js";
export default class Start {
  constructor() {}

  init() {
    this.toDoList = document.querySelector(".todo-list");
    this.updateTask();
    this.registerMainEvents();
  }

  updateTask() {
    loadToDoList();
  }

  registerMainEvents() {
    const toDoInput = document.querySelector(".new-todo");
    if (toDoInput) {
      toDoInput.addEventListener("keydown", keyDownEvent);
    }

    const clearCompleted = document.querySelector(".clear-completed");
    if (clearCompleted) {
      clearCompleted.addEventListener("click", clearCompletedEvent);
    }

    window.addEventListener("hashchange", urlControl);
  }
}
