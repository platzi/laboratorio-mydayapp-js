import "./css/base.css";
import { Controller } from "./js/controller";

class View {
  #controller;
  constructor() {
    this.#controller = new Controller();
    this.elementFooter = document.querySelector(".footer");
    this.elementMain = document.querySelector(".main");
    this.elementMainInput = document.querySelector(".new-todo");
    this.elementTodoList = document.querySelector(".todo-list");
  }
  init() {
    this.render();
    this.#initEvents();
  }
  #initEvents() {
    const that = this;
    window.addEventListener("load", function () {
      that.elementMainInput.focus();
    });

    this.elementMainInput.addEventListener("keyup", function (e) {
      const value = this.value.trim();
      if (e.keyCode !== 13 || !value) return;
      e.preventDefault();
      that.#controller.addTask({
        title: value,
        completed: false,
      });
      this.value = "";
      that.render();
    });
  }
  showElement(element, visible) {
    if (visible) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  }
  render() {
    const thereAreTasks = this.#controller.thereAreTasks();
    this.showElement(this.elementFooter, thereAreTasks);
    this.showElement(this.elementMain, thereAreTasks);
    const tasksList = this.#controller.getTasks();
    this.elementTodoList.innerHTML = "";
    for (let task of tasksList) {
      this.elementTodoList.innerHTML += `<li id="${task.id}" ${
        task.isCompleted() ? 'class="completed"' : ""
      }>
        <div class="view">
          <input class="toggle" type="checkbox" ${
            task.isCompleted() ? "checked" : ""
          } />
          <label>${task.title}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${task.title}" />
      </li>`;
    }
  }
}
new View().init();
