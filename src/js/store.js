import { getFilterByRoute } from "./crud.js";

let TODOS = getLocalStorage()

export function saveLocalStorage(TODOS) {
  localStorage.setItem("mydayapp-js", JSON.stringify(TODOS));
}

export function getLocalStorage(route = "") {
  let filter = route !== "" ? route : getFilterByRoute();
  let filterPredicate = (task) => task.completed === (filter === "completed");
  let todos = JSON.parse(localStorage.getItem("mydayapp-js"));
  if (filter !== "" && filter !== "all") todos = todos.filter(filterPredicate);
  return todos !== null ? todos : [];
}

export function removeFromLocalStorage(taskID) {
  TODOS = TODOS.filter((todo) => todo.id !== Number(taskID));
  localStorage.setItem("mydayapp-js", JSON.stringify(TODOS));
}
