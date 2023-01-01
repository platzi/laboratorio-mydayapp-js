import { render } from "./utils";

const keyLocalStorage = "TOO-LIST";
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

export const updateTodo = (index) => {
  const storage = JSON.parse(localStorage.getItem(keyLocalStorage));
  if (storage[index].state === "pending") {
    storage[index].state = "completed";
  } else storage[index].state = "pending";
  localStorage.setItem(keyLocalStorage, JSON.stringify(storage));
  render();
};
