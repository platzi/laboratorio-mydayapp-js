import "./css/base.css";
import {
  checkStorage,
  addNewTodo,
  deleteAll,
  checkIfThereAreTaskCompleted,
} from "./js/store";
import { render, hiddenTag } from "./js/utils";

const selectorAll = document.querySelector('footer ul li a[href="#/"]');
const selectorPending = document.querySelector(
  'footer ul li a[href="#/pending"]'
);
const selectorCompleted = document.querySelector(
  'footer ul li a[href="#/completed"]'
);
const buttonClean = document.querySelector(".clear-completed");
const storageData = checkStorage();
const data = {
  totalTodos: storageData.length,
  todos: storageData,
};

document.querySelector(".clear-completed").addEventListener("click", () => {
  deleteAll();
});

if (!data.totalTodos) {
  hiddenTag();
} else {
  if (checkIfThereAreTaskCompleted()) {
    buttonClean.style.visibility = "visible";
  } else {
    buttonClean.style.visibility = "hidden";
  }
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

//TODO: cambiar la propiedad 'state' por 'completed' y que sea un booleano.

document.querySelector(".new-todo").addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value.trim().length > 0) {
    const newTodo = {
      title: e.target.value.trim(),
      completed: false,
    };
    e.target.value = "";
    addNewTodo(newTodo);
    const path = window.location.hash.match(/[a-zA-z]+/);
    if (!path) render();
    else render(path[0]);
  }
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
