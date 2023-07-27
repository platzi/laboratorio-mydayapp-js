import { createTaskItem } from "./utils";

export default class View {
  constructor() {
    this.mainEl = document.querySelector(".main");
    this.footerEl = document.querySelector(".footer");
    this.todoListEl = document.querySelector(".todo-list");
    this.newTodoInputEl = document.querySelector(".new-todo");
  }

  renderTasks(tasks) {
    console.log(tasks);
    if (!tasks.length) {
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

  handleAddTask(handler) {
    this.newTodoInputEl.addEventListener("change", ({ target }) => {
      const value = target.value.trim();
      if (value === "") return;
      handler(value);
      target.value = "";
    });
  }
}
