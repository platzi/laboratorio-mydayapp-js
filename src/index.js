import "./css/base.css";
import TodoApp from "./js/todoApp";
import Ui from "./js/ui";

window.onload = () => {
  const ui = new Ui();
  const app = new TodoApp();

  const { hash } = new URL(window.location);

  ui.updateFilters(hash);
  ui.updateUi(app.filterTodos(hash));

  // Create new Todo
  ui.newTodoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && e.target.value.length >= 1) {
      app.newTodo(e.target.value.trim());

      e.target.value = "";
      ui.updateUi(app.todos);
    }
  });

  // Delete Todo
  ui.todosContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("destroy")) {
      app.deleteTodo(e.target.dataset.id);

      ui.updateUi(app.todos);
    }

    if (e.target.classList.contains("toggle")) {
      app.markAsComplete(e.target.dataset.id);

      ui.updateUi(app.todos);
    }
  });

  ui.todosContainer.addEventListener("dblclick", (e) => {
    if (e.target.localName === "label") {
      ui.showEditInput(e.target);
    }
  });

  ui.todosContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (!e.target.value.length) {
        app.deleteTodo(e.target.dataset.id);
        ui.updateUi(app.todos);
        return;
      }

      app.updateTodo(e.target.dataset.id, e.target.value.trim());
      ui.updateUi(app.todos);
    }

    if (e.key === "Escape") {
      ui.hideEditInput(e.target);
    }
  });

  // Filters
  window.addEventListener("hashchange", (e) => {
    ui.updateFilters(e.target.location.hash);

    ui.updateUi(app.filterTodos(e.target.location.hash));
  });

  // Clear completed todos
  ui.clearCompeted.addEventListener("click", () => {
    app.clearCompeted();

    ui.updateUi(app.todos);
  });
};
