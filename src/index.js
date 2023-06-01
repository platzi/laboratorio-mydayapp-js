import "./css/base.css";
import {
  addItem,
  removeItem,
  checkItem,
  clearCompletedItems,
} from "./js/utils";

let todoListItems = JSON.parse(localStorage.getItem("mydayapp-js")) ?? [];

/* Elements */
const wrapper = document.querySelector(".todoapp-wrapper");
const inputAddTodo = document.querySelector(".new-todo");
const todoList = document.querySelector(".todo-list");
const todoCount = document.querySelector(".todo-count");
const clearAllButton = document.querySelector(".clear-completed");
const anchorElements = document.querySelectorAll("a");

/* Functions */
const updateTodoCount = (todoListItems) => {
  todoCount.innerHTML =
    todoListItems.length !== 1
      ? `<strong>${todoListItems.length}</strong> items left`
      : `<strong>1</strong> item left`;
};

const isListItemEmpy = () => {
  if (todoListItems.length === 0) {
    const children = Array.from(wrapper.children);
    children.forEach((child) => {
      child.classList.add("hidden");
    });
  }
};

const createListItemTemplate = ({ id, text, completed }) => {
  const listItem = document.createElement("li");
  listItem.id = id;
  if (completed) listItem.classList.add("completed");

  listItem.innerHTML = `
    <div class="view">
      <input class="toggle" type="checkbox" ${completed ? "checked" : ""}>
      <label>${text}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value=${text}>
  `;

  return listItem;
};

const hideClearAllButton = (todoListItems) => {
  const completedListItems = todoListItems.filter((todo) => todo.completed);
  console.log(completedListItems);

  if (completedListItems.length === 0) clearAllButton.classList.add("hidden");
  else clearAllButton.classList.remove("hidden");
};

const renderAllList = () => {
  const auxList = document.createDocumentFragment();

  todoListItems.forEach((item) => {
    const listItem = createListItemTemplate({
      id: item.id,
      text: item.title,
      completed: item.completed,
    });
    auxList.appendChild(listItem);
  });

  todoList.innerHTML = `<ul class="todo-list"></ul>`;
  todoList.appendChild(auxList);
  updateTodoCount(todoListItems);
  hideClearAllButton(todoListItems);
};

const renderPendingList = () => {
  const auxList = document.createDocumentFragment();
  const pendingListItems = todoListItems.filter((todo) => !todo.completed);

  pendingListItems.forEach((item) => {
    const listItem = createListItemTemplate({
      id: item.id,
      text: item.title,
      completed: item.completed,
    });
    auxList.appendChild(listItem);
  });

  todoList.innerHTML = `<ul class="todo-list"></ul>`;
  todoList.appendChild(auxList);
  updateTodoCount(pendingListItems);
  hideClearAllButton(pendingListItems);
};

const renderCompletedList = () => {
  const auxList = document.createDocumentFragment();
  const completedListItems = todoListItems.filter((todo) => todo.completed);

  completedListItems.forEach((item) => {
    const listItem = createListItemTemplate({
      id: item.id,
      text: item.title,
      completed: item.completed,
    });
    auxList.appendChild(listItem);
  });

  todoList.innerHTML = `<ul class="todo-list"></ul>`;
  todoList.appendChild(auxList);
  updateTodoCount(completedListItems);
  hideClearAllButton(completedListItems);
};

/* First Render */
if (todoListItems.length === 0) {
  isListItemEmpy();
} else {
  const auxList = document.createDocumentFragment();

  todoListItems.forEach((item) => {
    const listItem = createListItemTemplate({
      id: item.id,
      text: item.title,
      completed: item.completed,
    });
    auxList.appendChild(listItem);
  });

  todoList.appendChild(auxList);
  updateTodoCount(todoListItems);
  hideClearAllButton(todoListItems);
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

    addItem(
      {
        id: id,
        title: todoText,
        completed: false,
      },
      todoListItems
    );

    const listItem = createListItemTemplate({
      id: id,
      text: todoText,
      completed: false,
    });

    todoList.appendChild(listItem);
    inputAddTodo.value = "";
    todoCount.children[0].textContent = todoListItems.length;
    updateTodoCount(todoListItems);
    hideClearAllButton(todoListItems);
  }
});

todoList.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON" && e.target.classList.contains("destroy")) {
    const item = e.target.parentNode.parentNode;

    removeItem(item.id, todoListItems);
    todoList.removeChild(item);
    updateTodoCount(todoListItems);
    hideClearAllButton(todoListItems);
    isListItemEmpy();
  }

  if (e.target.tagName === "INPUT" && e.target.classList.contains("toggle")) {
    const item = e.target.parentNode.parentNode;

    checkItem(item.id, todoListItems, e.target.checked);
    e.target.checked
      ? item.classList.add("completed")
      : item.classList.remove("completed");
    hideClearAllButton(todoListItems);
  }
});

clearAllButton.addEventListener("click", function () {
  const listItems = Array.from(todoList.children);

  if (listItems.length > 0) {
    listItems.forEach((item) => {
      if (item.classList.contains("completed")) item.remove();
    });

    clearCompletedItems(todoListItems);
    todoListItems = JSON.parse(localStorage.getItem("mydayapp-js"));
    updateTodoCount(todoListItems);
    hideClearAllButton(todoListItems);
    isListItemEmpy();
  }
});

anchorElements.forEach((anchor) => {
  anchor.addEventListener("click", handleAnchorClick);
});

function handleAnchorClick(e) {
  const href = e.target.getAttribute("href");

  anchorElements.forEach((anchor) => anchor.classList.remove("selected"));
  e.target.classList.add("selected");

  switch (href) {
    case "#/":
      renderAllList();
      break;
    case "#/pending":
      renderPendingList();
      break;
    case "#/completed":
      renderCompletedList();
      break;
  }
}

window.addEventListener("popstate", function (e) {
  switch (e.target.location.hash) {
    case "#/":
      renderAllList();
      break;
    case "#/pending":
      renderPendingList();
      break;
    case "#/completed":
      renderCompletedList();
      break;
  }
});
