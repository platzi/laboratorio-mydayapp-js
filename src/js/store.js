import { render, hiddenTag } from "./utils";

const buttonClean = document.querySelector(".clear-completed");
const keyLocalStorage = "mydayapp-js";
export const checkStorage = () => {
  const storage = JSON.parse(localStorage.getItem(keyLocalStorage));

  if (storage === null) {
    localStorage.setItem(keyLocalStorage, JSON.stringify([]));
    return [];
  }

  return storage;
};

export const checkIfThereAreTaskCompleted = () => {
  const storage = JSON.parse(localStorage.getItem(keyLocalStorage));
  let taskCompleted = false;
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].completed) {
      taskCompleted = true;
      break;
    }
  }
  return taskCompleted;
};

export const addNewTodo = (todo) => {
  const storage = JSON.parse(localStorage.getItem(keyLocalStorage));
  storage.push(todo);
  localStorage.setItem(keyLocalStorage, JSON.stringify(storage));
};

export const updateTodoState = (index) => {
  const storage = JSON.parse(localStorage.getItem(keyLocalStorage));
  storage[index].completed = !storage[index].completed;
  localStorage.setItem(keyLocalStorage, JSON.stringify(storage));
  if (checkIfThereAreTaskCompleted()) {
    buttonClean.style.visibility = "visible";
  } else {
    buttonClean.style.visibility = "hidden";
  }

  if (window.location.hash.startsWith("#/pending")) {
    render("pending");
  } else if (window.location.hash.startsWith("#/completed")) {
    render("completed");
  } else render();
};

export const updateTodo = (index, value) => {
  const storage = JSON.parse(localStorage.getItem(keyLocalStorage));
  storage[index].title = value;
  localStorage.setItem(keyLocalStorage, JSON.stringify(storage));
  if (window.location.hash.startsWith("#/pending")) {
    render("pending");
  } else if (window.location.hash.startsWith("#/completed")) {
    render("completed");
  } else render();
};

export const deleteTodo = (index) => {
  const path = window.location.hash.match(/[a-zA-z]+/);
  const storage = JSON.parse(localStorage.getItem(keyLocalStorage));
  const newStorage = [];

  delete storage[index];
  storage.map((item) => newStorage.push(item));
  localStorage.setItem(keyLocalStorage, JSON.stringify(newStorage));

  if (checkIfThereAreTaskCompleted()) {
    buttonClean.style.visibility = "visible";
  } else {
    buttonClean.style.visibility = "hidden";
  }
  if (!newStorage.length) {
    hiddenTag();
  } else {
    if (!path) render();
    else render(path[0]);
  }
};

export const deleteAll = () => {
  const storage = JSON.parse(localStorage.getItem(keyLocalStorage));
  const newStorage = storage.filter((item) => !item.completed);

  buttonClean.style.visibility = "hidden";
  localStorage.setItem(keyLocalStorage, JSON.stringify(newStorage));
  if (!newStorage.length) {
    hiddenTag();
  } else {
    if (window.location.hash.startsWith("#/pending")) {
      render("pending");
    } else if (window.location.hash.startsWith("#/completed")) {
      render("completed");
    } else render();
  }
};
