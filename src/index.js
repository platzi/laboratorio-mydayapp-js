import "./css/base.css";
import { clearTaskCompleted } from "./js/UI/ClearTaskCompleted";
import { inputValue } from "./js/UI/InputValue";
import { renderUI } from "./js/UI/renderUI";
import { firstLoad } from "./js/logic/FirstLoad";

export const main = document.querySelector(".main");
export const footer = document.querySelector(".footer");
export const inputNewTodo = document.querySelector(".new-todo");
export const todoListContainer = document.querySelector(".todo-list");
export const todoCount = document.querySelector(".todo-count");
export const clearCompleted = document.querySelector(".clear-completed");
export const filters = document.querySelector(".filters");

window.addEventListener("hashchange", renderUI, false);
clearCompleted.addEventListener("click", clearTaskCompleted);
inputNewTodo.addEventListener("keydown", handleInput);
function handleInput({ key }) {
  if (key === "Enter") {
    inputValue(inputNewTodo.value);
  }
}
window.addEventListener("load", firstLoad);
