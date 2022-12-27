class Ui {
  constructor() {
    this.loadElements();
  }

  loadElements() {
    this.main = document.querySelector(".main");
    this.footer = document.querySelector(".footer");

    this.newTodoInput = document.querySelector(".new-todo");
    this.todosContainer = document.querySelector(".todo-list");
    this.todosCounter = document.querySelector(".todo-count");

    this.destroyBtn = document.querySelectorAll(".destroy");
    this.clearCompeted = document.querySelector(".clear-completed");
    this.filters = document.querySelector(".filters");
  }

  hideMainAndFooter() {
    this.main.classList.add("d-none");
    this.footer.classList.add("d-none");
  }

  showMainAndFooter() {
    this.main.classList.remove("d-none");
    this.footer.classList.remove("d-none");
  }

  updateUi(todos) {
    // Show or hide menus
    if (!todos.length) {
      this.hideMainAndFooter();
    } else {
      this.showMainAndFooter();
    }

    // Print todos
    this.printTodos(todos);

    // Items left counter
    const pendingTodos = todos.filter((todo) => !todo.completed).length;
    this.todosCounter.innerHTML = `<strong>${pendingTodos}</strong> ${
      pendingTodos === 1 ? "item" : "items"
    } left`;

    // Clear completed button
    const completedTodos = todos.filter((todo) => todo.completed).length;
    if (completedTodos) {
      this.clearCompeted.classList.remove("d-none");
    } else {
      this.clearCompeted.classList.add("d-none");
    }
  }

  updateFilters(hash) {
    const filterTags = document.querySelectorAll(".filters a");

    filterTags.forEach((tag) => {
      if (!hash.length && tag.hash === "#/") {
        tag.classList.add("selected");
        return;
      }

      if (tag.hash === hash) {
        tag.classList.add("selected");
        return;
      }

      tag.classList.remove("selected");
    });
  }

  printTodos(todos) {
    this.todosContainer.innerHTML = "";
    let content = "";

    todos.forEach((todo) => {
      content += this.newTodoElement(todo);
    });

    this.todosContainer.innerHTML = content;
  }

  newTodoElement(todo) {
    return `<li class="${todo.completed ? "completed" : ""}" data-id="${
      todo.id
    }">
      <div class="view">
        <input class="toggle" type="checkbox" ${
          todo.completed ? "checked" : ""
        } data-id="${todo.id}" />
        <label>${todo.title}</label>
        <button class="destroy" data-id="${todo.id}"></button>
      </div>
      <input class="edit" data-id="${todo.id}" value="${todo.title}" />
    </li>`;
  }

  showEditInput(labelEl) {
    const todoContainer = labelEl.parentElement.parentElement;

    todoContainer.firstElementChild.style.display = "none";
    todoContainer.lastElementChild.style.display = "block";
    todoContainer.lastElementChild.focus();
  }

  hideEditInput(inputEl) {
    const todoContainer = inputEl.parentElement;

    todoContainer.firstElementChild.style.display = "block";
    todoContainer.lastElementChild.style.display = "none";
  }
}

export default Ui;
