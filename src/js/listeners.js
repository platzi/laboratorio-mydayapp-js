import { addTodo, clearCompletedTasks, filterTODOSByRoute } from "./crud.js";

let inputTodo = document.getElementsByClassName("new-todo")[0];
let clearCompletedButton =
  document.getElementsByClassName("clear-completed")[0];
let filterButtons = document
  .getElementsByClassName("filters")[0]
  .querySelectorAll("li a");

export function addListenerToFilterButtons() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      filterButtons.forEach((element) => element.classList.remove("selected"));
      button.classList.add("selected");
      filterTODOSByRoute(event.target.href);
    });
  });
}
export function addListenerToCreateTask() {
  inputTodo.addEventListener("keypress", (event) => {
    const errorMessage = document.querySelector(".error-message");

    if (event.key === "Enter") {
      if (inputTodo.value.length !== 0) {
        event.preventDefault();
        addTodo({ title: inputTodo.value.trim() });
        inputTodo.value = "";
        errorMessage.textContent = "";
      } else {
        event.target.setCustomValidity(
          "La tarea debe contener al menos un caracter"
        );
        errorMessage.textContent = event.target.validationMessage;
      }
    }
  });
}

export function addListenerToNavigationHistory() {
  window.addEventListener("popstate", function (event) {
    filterTODOSByRoute(event.target.location.href);
  });
}

export function addListenerToClearTask() {
  clearCompletedButton.addEventListener("click", () => clearCompletedTasks());
}
