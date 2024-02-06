import "./css/base.css";

let todoList = JSON.parse(localStorage.getItem("mydayapp-js")) || [];

localStorage.setItem("mydayapp-js", JSON.stringify(todoList));

const mainSection = document.querySelector(".main");
const footerSection = document.querySelector(".footer");

let todoListLS = [];
let todoListPending = [];
let todoListCompleted = [];

function renderApp() {
  todoListLS = JSON.parse(localStorage.getItem("mydayapp-js"));
  todoListPending = todoListLS.filter((todo) => todo.completed === false);
  todoListCompleted = todoListLS.filter((todo) => todo.completed === true);

  if (todoListLS.length === 0) {
    mainSection.style.display = "none";
    footerSection.style.display = "none";
  } else {
    mainSection.style.display = "block";
    footerSection.style.display = "block";
  }

  if (window.location.hash === "#/pending") {
    renderTodoList(todoListPending);
    taskActions(todoListPending);
  } else if (window.location.hash === "#/completed") {
    renderTodoList(todoListCompleted);
    taskActions(todoListCompleted);
  } else {
    renderTodoList(todoListLS);
    taskActions(todoListLS);
  }

  const todoCounter = document.querySelector(".todo-count");
  if (todoListPending.length != 1) {
    todoCounter.innerHTML = `<strong>${todoListPending.length}</strong> items left`;
  } else {
    todoCounter.innerHTML = `<strong>${todoListPending.length}</strong> item left`;
  }

  clearCompletedElement = document.querySelector(".clear-completed");
  if (todoListCompleted.length != 0) {
    clearCompletedElement.hidden = false;
  } else {
    clearCompletedElement.hidden = true;
  }
}

function renderTodoList(array) {
  const todoListContainer = document.querySelector(".todo-list");
  if (array.length > 0 && array != null && array != undefined) {
    let todoListTem = "";
    array.map((todo, index) => {
      let todoItem = `
                <li id="todo-${index}" class=${
        todo.completed ? "completed" : ""
      }>
                  <div class="view">
                    <input class="toggle" type="checkbox" ${
                      todo.completed ? "checked" : ""
                    } />
                    <label>${todo.title}</label>
                    <button class="destroy"></button>
                  </div>
                  <input class="edit" value="${todo.title}" />
                </li>
            `;
      todoListTem += todoItem;
    });
    todoListContainer.innerHTML = todoListTem;
  } else {
    todoListContainer.innerHTML = ``;
  }
}

// Add new task
const newTodoInput = document.querySelector(".new-todo");
newTodoInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13 && !e.shiftKey) {
    createTask(newTodoInput.value);
    newTodoInput.value = "";
  }
});

// Create new task function
function createTask(task) {
  if (!!task) {
    const todoItem = {
      id: Math.floor(Math.random() * 1000),
      title: task.trim(),
      completed: false,
    };
    localStorage.setItem(
      "mydayapp-js",
      JSON.stringify([...todoListLS, todoItem])
    );
    renderApp();
  }
}

// Tasks actions
function taskActions(array) {
  array.forEach((todo, index) => {
    const todoItemElement = document.getElementById(`todo-${index}`);

    // Checkbox task
    const checkboxElement = todoItemElement.querySelector(".toggle");
    checkboxElement.addEventListener("click", () => {
      todoListLS[index].completed = !todoListLS[index].completed;

      localStorage.setItem("mydayapp-js", JSON.stringify(todoListLS));
      renderApp();
    });

    // Edit task
    const labelElement = todoItemElement.querySelector("label");
    labelElement.addEventListener("dblclick", () => {
      todoItemElement.classList.toggle("editing");

      const taskNewTitle = todoItemElement.querySelector(".edit");
      taskNewTitle.focus();

      taskNewTitle.addEventListener("keyup", (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
          todoListLS[index].title = taskNewTitle.value.trim();

          localStorage.setItem("mydayapp-js", JSON.stringify(todoListLS));
          renderApp();
        } else if (e.keyCode === 27) {
          todoItemElement.classList.remove("editing");
          taskNewTitle.value = labelElement.innerText;
        }
      });
    });

    // Delete task
    const deleteElement = todoItemElement.querySelector(".destroy");
    deleteElement.addEventListener("click", () => {
      todoListLS.splice(index, 1);
      localStorage.setItem("mydayapp-js", JSON.stringify(todoListLS));
      renderApp();
    });
  });
}

// Clear completes task
let clearCompletedElement = document.querySelector(".clear-completed");
clearCompletedElement.addEventListener("click", () => {
  if (todoListCompleted.length != 0) {
    localStorage.setItem("mydayapp-js", JSON.stringify(todoListPending));
    renderApp();
  }
});

window.addEventListener("hashchange", () => {
  renderApp();
});

const filtersElementsArray = document.querySelectorAll(".filters li");

filtersElementsArray.forEach((filter, index) => {
  filter.addEventListener("click", () => {
    filtersElementsArray.forEach((f, i) => {
      if (i === index) {
        f.querySelector("a").classList.add("selected");
      } else {
        f.querySelector("a").classList.remove("selected");
      }
    });
  });
});

renderApp();
