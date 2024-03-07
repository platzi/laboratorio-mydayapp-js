import "./css/base.css";

import {
  sayHello,
  checkItems,
  addTask,
  clearTasks,
  filterTasks,
} from "./js/utils";

console.log(sayHello("Hello"));

document.onload = checkItems();

const input = document.querySelector(".new-todo");

if (input) {
  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (event.target.value) {
        addTask(event.target.value.trim());
        input.value = "";
      }
    }
  });
}

const cleanButton = document.querySelector(".clear-completed");

if (cleanButton) {
  cleanButton.addEventListener("click", () => {
    clearTasks();
  });
}

const filterButtons = document.querySelectorAll(".filters li a");

filterButtons.forEach((button) => {
  const type = button.getAttribute("href").substring(2);
  button.addEventListener("click", () => {
    if (!button.classList.contains("selected")) {
      const activeButton = document.querySelector(".selected");
      if (activeButton) {
        activeButton.className = "";
      }
      button.className = "selected";
      filterTasks(type);
    }
  });
});

window.addEventListener("hashchange", function () {
  const hash = window.location.hash || "#/"; // Obtener el fragmento de la URL
  const type = hash.substring(2);
  const activeButton = document.querySelector(".selected");
  if (activeButton) {
    activeButton.className = "";
  }
  const link = document.querySelector(`a[href="${hash}"]`);
  link.className = "selected";
  filterTasks(type);
  // Aquí puedes poner tu lógica para manejar el cambio de ruta
  console.log("La ruta ha cambiado a", hash);
});
