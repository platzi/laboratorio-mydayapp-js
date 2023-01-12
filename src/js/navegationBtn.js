import { todoList } from "..";
import { newItem } from "./newItem";
import { counter } from "./counter";

export function navegation() {
  //Obteniendo elementos del DOM
  const allBtn = document.querySelector(".allBtn");
  const completedBtn = document.querySelector(".completedBtn");
  const pendingBtn = document.querySelector(".pendingBtn");
  //Verificación del hash para filtar el contenido del render: all, pending y completed
  if (location.hash === '#/completed') {
    todoList.forEach(element => {
      if (element.completed === false) {
        element.visible = false
      } else {
        element.visible = true

      }
    });
    allBtn.classList.remove("selected");
    completedBtn.classList.add("selected");
    pendingBtn.classList.remove("selected");
    newItem();
    counter()
  } else if (location.hash === '#/pending') {
    todoList.forEach(element => {
      if (element.completed === true) {
        element.visible = false
      } else {
        element.visible = true

      }
    });
    allBtn.classList.remove("selected");
    completedBtn.classList.remove("selected");
    pendingBtn.classList.add("selected");
    newItem()
    counter()

  } else if (location.hash === '#/all') {
    todoList.forEach(element => {
      element.visible = true

    });
    allBtn.classList.add("selected");
    completedBtn.classList.remove("selected");
    pendingBtn.classList.remove("selected");
    newItem()
    counter()
  }

}

