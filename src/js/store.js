import { render, hiddenTag } from "./utils";

const keyLocalStorage = "mydayapp-js";
export const checkStorage = () => {
  const storage = JSON.parse(localStorage.getItem(keyLocalStorage));

  if (storage === null) {
    localStorage.setItem(keyLocalStorage, JSON.stringify([]));
    return [];
  }

  return storage;
};

export const addNewTodo = (todo) => {
  const storage = JSON.parse(localStorage.getItem(keyLocalStorage));
  storage.push(todo);
  localStorage.setItem(keyLocalStorage, JSON.stringify(storage));
};

export const updateTodoState = (index) => {
  const storage = JSON.parse(localStorage.getItem(keyLocalStorage));
  if (storage[index].state === "pending") {
    storage[index].state = "completed";
  } else storage[index].state = "pending";
  localStorage.setItem(keyLocalStorage, JSON.stringify(storage));
  render();
};

export const updateTodo = (index, value) => {
  const storage = JSON.parse(localStorage.getItem(keyLocalStorage));
  storage[index].todo = value;
  localStorage.setItem(keyLocalStorage, JSON.stringify(storage));
  render();
};

export const deleteTodo = (index) => {
  const storage = JSON.parse(localStorage.getItem(keyLocalStorage));
  const newStorage = [];

  delete storage[index];
  storage.map((item) => newStorage.push(item));
  localStorage.setItem(keyLocalStorage, JSON.stringify(newStorage));

  if (!newStorage.length) {
    hiddenTag();
  } else render();
};
