import { createTaskItem } from "./utils";

export default class View {
  constructor() {
    this.mainEl = document.querySelector(".main");
    this.footerEl = document.querySelector(".footer");
    this.todoListEl = document.querySelector(".todo-list");
    this.newTodoInputEl = document.querySelector(".new-todo");
    this.todoCountEl = document.querySelector(".todo-count");
    this.clearCompletedEl = document.querySelector(".clear-completed");
    this.filtersEl = document.querySelector(".filters");
  }

  renderTasks(tasks, show = true) {
    if (!show) {
      this.mainEl.classList.add("hidden");
      this.footerEl.classList.add("hidden");
      return;
    } else {
      this.mainEl.classList.remove("hidden");
      this.footerEl.classList.remove("hidden");
    }

    this.todoListEl.innerHTML = "";
    tasks.forEach((task) => {
      const taskItem = createTaskItem(task);
      this.todoListEl.appendChild(taskItem);
    });
  }

  updateCounter(counter) {
    this.todoCountEl.innerHTML = `<strong>${counter}</strong> item${
      counter === 1 ? "" : "s"
    } left`;
  }

  handleAddTask(handler) {
    this.newTodoInputEl.addEventListener("change", ({ target }) => {
      const value = target.value.trim();
      if (value === "") return;
      handler(value);
      target.value = "";
    });
  }

  handleRemoveTask(handler) {
    this.todoListEl.addEventListener("click", ({ target }) => {
      if (!target.classList.contains("destroy")) return;
      const li = target.closest("li");
      const { id } = li.dataset;

      handler(id);

      li.remove();
    });
  }

  handleToggleTask(handler) {
    this.todoListEl.addEventListener("click", ({ target }) => {
      if (!target.classList.contains("toggle")) return;
      const li = target.closest("li");
      const { id } = li.dataset;
      handler(id);
      li.classList.toggle("completed");
    });
  }

  handleRemoveCompletedTasks(handler) {
    this.clearCompletedEl.addEventListener("click", handler);
  }

  handleFilterTasks() {
    this.filtersEl.addEventListener("click", ({ target }) => {
      if (!target.closest("li")) return;
      this.filtersEl
        .querySelectorAll("a")
        .forEach((el) => el.classList.remove("selected"));

      target.classList.add("selected");
    });

    window.addEventListener("load", () => {
      const { hash } = location;

      this.filtersEl
        .querySelectorAll("a")
        .forEach((el) => el.classList.remove("selected"));

      this.filtersEl
        .querySelector(`a[href='${hash}']`)
        .classList.add("selected");
    });
  }

  handleEditMode(handler) {
    this.todoListEl.addEventListener("dblclick", ({ target }) => {
      Array.from(this.todoListEl.children).forEach((el) =>
        el.classList.remove("editing")
      );
      if (!target.closest("label")) return;
      const li = target.closest("li");
      const { id } = li.dataset;
      const inputEdit = li.querySelector(".edit");
      if (!li) return;
      li.classList.add("editing");
      inputEdit.focus();

      inputEdit.addEventListener(
        "change",
        (e) => {
          const value = e.target.value.trim();
          if (value === "") return;
          handler(id, value);
          li.classList.remove("editing");
        },
        { once: true }
      );
    });
  }
}
