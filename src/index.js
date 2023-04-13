import "./css/base.css";
import { clearTaskCompleted } from "./js/UI/ClearTaskCompleted";
import { renderUI } from "./js/UI/renderUI";
import { firstLoad } from "./js/logic/FirstLoad";

export const main = document.querySelector(".main");
export const footer = document.querySelector(".footer");
export const inputNewTodo = document.querySelector(".new-todo");
export const todoCount = document.querySelector(".todo-count");
export const clearCompleted = document.querySelector(".clear-completed");

window.addEventListener("hashchange", renderUI, false);
clearCompleted.addEventListener("click", clearTaskCompleted);
inputNewTodo.addEventListener("keydown", handleInput);
function handleInput({ key }) {
  if (key === "Enter") {
    import("./js/UI/InputValue").then((module) =>
      module.inputValue(inputNewTodo.value)
    );
  }
}
window.addEventListener("load", firstLoad);
