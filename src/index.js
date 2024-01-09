import "./css/base.css";

window.addEventListener("hashchange", navigator, false);
window.addEventListener("DOMContentLoaded", navigator, false);

const todosContainer = document.querySelector(".todo-list");
const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const newTodoInput = document.querySelector(".new-todo");
const todoCount = document.querySelector(".todo-count");
const clearCompletedBtn = document.querySelector(".clear-completed");
const allSelector = document.querySelector("#all");
const pendingSelector = document.querySelector("#pending");
const completedSelector = document.querySelector("#completed");

let todos = [];

const getLocalStorageTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  return todos ? todos : [];
};

const removeTodo = (id) => {
  todos = getLocalStorageTodos();

  return function () {
    todos.forEach((todo, index) => {
      if (todo.id === id) {
        todos.splice(index, 1);
      }
    });
    showTodos(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  };
};

const toggleCompleted = (id) => {
  todos = getLocalStorageTodos();

  return function () {
    const todo = todos.find((item) => item.id === id);
    todo.completed === true
      ? (todo.completed = false)
      : (todo.completed = true);
    localStorage.setItem("todos", JSON.stringify(todos));
    showPendingTodosCounter();
  };
};

const showPendingTodosCounter = () => {
  todos = getLocalStorageTodos();

  todoCount.innerHTML = "";
  const pendingTodos = todos.filter((todo) => todo.completed === false);
  const counterContainer = document.createElement("strong");
  const counter = document.createTextNode(pendingTodos.length || 0);
  counterContainer.appendChild(counter);
  const text = document.createTextNode(" item (s) left");
  todoCount.appendChild(counterContainer);
  todoCount.appendChild(text);
};

const showPendingTodos = () => {
  todos = getLocalStorageTodos();

  const pendingTodos = todos.filter((todo) => todo.completed === false);
  showTodos(pendingTodos);
};

const showCompletedTodos = () => {
  todos = getLocalStorageTodos();

  const completedTodos = todos.filter((todo) => todo.completed === true);
  showTodos(completedTodos);
};

const clearCompletedTodos = () => {
  todos = getLocalStorageTodos();

  const pendingTodos = todos.filter((todo) => todo.completed === false);
  todos = pendingTodos;
  localStorage.setItem("todos", JSON.stringify(todos));

  navigator();
};
const showTodos = (todos) => {
  main.classList.remove("hidden");
  footer.classList.remove("hidden");
  todosContainer.innerHTML = "";
  todos.forEach((todo) => {
    const todoElement = document.createElement("li");
    const todoView = document.createElement("div");
    todoView.classList.add("view");
    const todoCheck = document.createElement("input");
    todoCheck.classList.add("toggle");
    todoCheck.setAttribute("type", "checkbox");
    const todoLabel = document.createElement("label");
    const todoTitleText = document.createTextNode(todo.text);
    todoLabel.appendChild(todoTitleText);
    const destroyBtn = document.createElement("button");
    destroyBtn.classList.add("destroy");
    const editInput = document.createElement("input");
    editInput.classList.add("edit");
    editInput.setAttribute("value", "Change your todo :)");

    todoView.appendChild(todoCheck);
    todoView.appendChild(todoLabel);
    todoView.appendChild(destroyBtn);
    todoElement.appendChild(todoView);
    todoElement.appendChild(editInput);
    todosContainer.appendChild(todoElement);

    todo.completed === true
      ? (todoCheck.checked = true)
      : (todoCheck.checked = false);

    destroyBtn.addEventListener("click", removeTodo(todo.id));
    todoCheck.addEventListener("change", toggleCompleted(todo.id));
    todoLabel.addEventListener("dblclick", () => {
      console.log("el pepe");
      editInput.style.display = "block";
    });
    editInput.addEventListener("change", (e) => {
      document.addEventListener("keyup", (event) => {
        const newTodoText = e.target.value.trim();
        if (event.code === "Enter" && newTodoText.length >= 1) {
          todo.text = newTodoText;
          editInput.style.display = "none";
          navigator();
        }
      });
    });
  });

  showPendingTodosCounter();
};

newTodoInput.addEventListener("change", (e) => {
  todos = getLocalStorageTodos();
  document.addEventListener("keyup", (event) => {
    const todoText = e.target.value.trim();
    if (event.code === "Enter" && todoText.length >= 1) {
      const todo = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        text: todoText,
        completed: false,
      };
      todos.push(todo);
      e.target.value = "";
      localStorage.setItem("todos", JSON.stringify(todos));
      navigator();
    }
  });
});

clearCompletedBtn.addEventListener("click", clearCompletedTodos);

function navigator() {
  todos = getLocalStorageTodos();

  if (todos.length < 1) {
    location.hash = "#/all";
    main.classList.add("hidden");
    footer.classList.add("hidden");
  }

  if (location.hash.startsWith("#/pending")) {
    allSelector.classList.remove("selected");
    pendingSelector.classList.add("selected");
    completedSelector.classList.remove("selected");

    showPendingTodos();
  } else if (location.hash.startsWith("#/completed")) {
    allSelector.classList.remove("selected");
    pendingSelector.classList.remove("selected");
    completedSelector.classList.add("selected");
    showCompletedTodos();
  } else {
    allSelector.classList.add("selected");
    pendingSelector.classList.remove("selected");
    completedSelector.classList.remove("selected");
    todos.length >= 1 && showTodos(todos);
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
