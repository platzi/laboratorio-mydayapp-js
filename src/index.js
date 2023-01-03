import "./css/base.css";
import { checkStorage, addNewTodo, deleteAll } from "./js/store";
import { render, hiddenTag } from "./js/utils";

const selectorAll = document.querySelector('footer ul li a[href="#/"]');
const selectorPending = document.querySelector(
  'footer ul li a[href="#/pending"]'
);
const selectorCompleted = document.querySelector(
  'footer ul li a[href="#/completed"]'
);
const storageData = checkStorage();
const data = {
  totalTodos: storageData.length,
  todos: storageData,
};

if (!data.totalTodos) {
  hiddenTag();
} else {
  if (window.location.hash.startsWith("#/pending")) {
    selectorPending.classList.add("selected");
    selectorAll.classList.remove("selected");
    selectorCompleted.classList.remove("selected");
    render("pending");
  } else if (window.location.hash.startsWith("#/completed")) {
    selectorPending.classList.remove("selected");
    selectorAll.classList.remove("selected");
    selectorCompleted.classList.add("selected");
    render("completed");
  } else {
    selectorPending.classList.remove("selected");
    selectorAll.classList.add("selected");
    selectorCompleted.classList.remove("selected");
    render();
  }
}

document.querySelector(".new-todo").addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value.trim().length > 0) {
    const newTodo = {
      todo: e.target.value.trim(),
      state: "pending",
    };
    e.target.value = "";
    addNewTodo(newTodo);
    render(window.location.hash.match(/[a-zA-z]+/)[0]);
  }
});

document.querySelector(".clear-completed").addEventListener("click", () => {
  deleteAll();
});

window.addEventListener("hashchange", () => {
  if (window.location.hash.startsWith("#/pending")) {
    selectorPending.classList.add("selected");
    selectorAll.classList.remove("selected");
    selectorCompleted.classList.remove("selected");
    render("pending");
  } else if (window.location.hash.startsWith("#/completed")) {
    selectorPending.classList.remove("selected");
    selectorAll.classList.remove("selected");
    selectorCompleted.classList.add("selected");
    render("completed");
  } else {
    selectorPending.classList.remove("selected");
    selectorAll.classList.add("selected");
    selectorCompleted.classList.remove("selected");
    render();
  }
});
