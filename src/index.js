import "./css/base.css";
import { Controller } from "./js/controller";

class View {
  #controller;
  #filter;
  constructor() {
    this.#controller = new Controller();
    this.elementFooter = document.querySelector(".footer");
    this.elementMain = document.querySelector(".main");
    this.elementMainInput = document.querySelector(".new-todo");
    this.elementTodoList = document.querySelector(".todo-list");
    this.elementTodoCount = document.querySelector(".todo-count");
    this.elementClearCompleted = document.querySelector(".clear-completed");
    this.elementFilters = document.querySelector(".filters");
    this.catchCurrentFilter();
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
    window.addEventListener("hashchange", function () {
      that.catchCurrentFilter();
      that.updateSelectedFilter();
      that.render();
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

    //TODO: Make both click and double click events work on the same element.
    /*this.elementTodoList.addEventListener("dblclick", function (e) {
      const element = e.target;
      if (element.tagName !== "LABEL") return;
      const taskLIElement = element.closest("li");
      const task = that.#controller.findTaskById(taskLIElement.id);
      const input = taskLIElement.querySelector(".edit");
      taskLIElement.classList.add("editing");
      input.value = task.title;
      input.setSelectionRange(input.value.length, input.value.length);
      input.focus();
    });*/

    this.elementTodoList.addEventListener("click", function (e) {
      const element = e.target;
      const idTask = element.closest("li").id;
      switch (element.className) {
        case "toggle":
          that.#controller.toggleStatusTask(idTask);
          break;
        case "destroy":
          console.log(element);
          break;
      }
      that.render();
    });

    this.elementTodoList.addEventListener("keyup", function (e) {
      const element = e.target;
      if (element.tagName !== "INPUT") return;

      const taskLIElement = element.closest("li");
      if (e.keyCode === 27) {
        taskLIElement.classList.remove("editing");
        // that.render();
        return;
      }

      const value = element.value.trim();
      if (e.keyCode !== 13 || !value) return;
      const idTask = taskLIElement.id;
      e.preventDefault();
      that.#controller.updateTitleTask(idTask, value);
      that.render();
    });

    this.elementClearCompleted.addEventListener("click", function () {
      that.#controller.deleteCompletedTasks();
      that.render();
    });

    this.elementFilters.addEventListener("click", function (e) {
      if (e.target.tagName !== "A") return;
      this.updateSelectedFilter();
    });
  }
  showElement(element, visible) {
    if (visible) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  }

  catchCurrentFilter() {
    const urlHash = window.location.hash;
    if (urlHash.includes("pending")) {
      this.#filter = "PENDING";
    } else if (urlHash.includes("completed")) {
      this.#filter = "COMPLETED";
    } else {
      this.#filter = "ALL";
    }
  }
  updateSelectedFilter() {
    const element = this.elementFilters.querySelector(
      `a[href='${window.location.hash}']`
    );
    const selectedElement = this.elementFilters.querySelector(".selected");
    if (element.isEqualNode(selectedElement)) return;
    selectedElement.classList.remove("selected");
    element.classList.add("selected");
  }
  generateUITask(task) {
    const checked = task.isCompleted() ? "checked" : "";
    const cssClass = task.isCompleted() ? 'class="completed"' : "";
    return `<li id="${task.id}" ${cssClass}>
        <div class="view">
          <input class="toggle" type="checkbox" ${checked} />
          <label>${task.title}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${task.title}" />
      </li>`;
  }
  render() {
    const thereAreTasks = this.#controller.thereAreTasks();
    this.showElement(this.elementFooter, thereAreTasks);
    this.showElement(this.elementMain, thereAreTasks);
    const tasksList = this.#controller.getTasks(this.#filter);
    this.elementTodoList.innerHTML = "";
    for (let task of tasksList) {
      this.elementTodoList.innerHTML += this.generateUITask(task);
    }
    const countPendingTasks = this.#controller
      .getTaskList()
      .getPendingTasks().length;
    this.elementTodoCount.innerHTML = `<strong>${countPendingTasks}</strong> item${
      countPendingTasks !== 1 ? "s" : ""
    } left`;
  }
}
new View().init();
