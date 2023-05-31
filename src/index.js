import "./css/base.css";
import { addItem, removeItem, checkItem } from "./js/utils";

const wrapper = document.querySelector(".todoapp-wrapper");
const todoListItems = JSON.parse(localStorage.getItem("mydayapp-js")) ?? [];

const inputAddTodo = document.querySelector(".new-todo");
const todoList = document.querySelector(".todo-list");
const todoCount = document.querySelector(".todo-count");
// const clearAllButton = document.querySelector("clear-completed")

/* Functions */
const updateTodoCount = () => {
  todoCount.innerHTML =
    todoListItems.length !== 1
      ? `<strong>${todoListItems.length}</strong> items left`
      : `<strong>1</strong> item left`;
};

/* First Render */
if (todoListItems.length === 0) {
  const children = Array.from(wrapper.children);
  children.forEach((child) => {
    child.classList.add("hidden");
  });
} else {
  const auxList = document.createDocumentFragment();

  todoListItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.id = item.id;
    if (item.completed) listItem.classList.add("completed");

    listItem.innerHTML = `
      <div class="view">
        <input class="toggle" type="checkbox" ${
          item.completed ? "checked" : ""
        }>
        <label>${item.title}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value=${item.title}>
    `;
    auxList.appendChild(listItem);
  });

  todoList.appendChild(auxList);
  updateTodoCount();
}

/* Event Listener */
inputAddTodo.addEventListener("keydown", function (e) {
  const todoText = e.target.value.trim();
  const id = Date.now().toString() + todoText;

  if (e.key === "Enter" && todoText.length > 0) {
    if (todoListItems.length === 0) {
      const children = Array.from(wrapper.children);
      children.forEach((child) => {
        child.classList.remove("hidden");
      });
    }
    const listItem = document.createElement("li");
    listItem.id = id;

    addItem(
      {
        id: id,
        title: todoText,
        completed: false,
      },
      todoListItems
    );

    listItem.innerHTML = `
      <div class="view">
        <input class="toggle" type="checkbox">
        <label>${todoText}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value=${todoText}>
    `;

    todoList.appendChild(listItem);
    inputAddTodo.value = "";
    todoCount.children[0].textContent = todoListItems.length;
    updateTodoCount();
  }
});

todoList.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON" && e.target.classList.contains("destroy")) {
    const item = e.target.parentNode.parentNode;

    removeItem(item.id, todoListItems);
    todoList.removeChild(item);
    updateTodoCount();

    if (todoListItems.length === 0) {
      const children = Array.from(wrapper.children);
      children.forEach((child) => {
        child.classList.add("hidden");
      });
    }
  }

  if (e.target.tagName === "INPUT" && e.target.classList.contains("toggle")) {
    const item = e.target.parentNode.parentNode;
    checkItem(item.id, todoListItems, e.target.checked);
    e.target.checked
      ? item.classList.add("completed")
      : item.classList.remove("completed");
  }
});
