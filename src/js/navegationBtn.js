import { todoList } from "..";
import { newItem } from "./newItem";
import { counter } from "./counter";

export function navegation() {
  const allBtn = document.querySelector(".allBtn");
  const completedBtn = document.querySelector(".completedBtn");
  const pendingBtn = document.querySelector(".pendingBtn");

  if (location.hash.startsWith('#/completed')) {
    //const completedArrGet = JSON.parse(localStorage.getItem('mydayapp-js-completed'));
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
    newItem(todoList);
    counter()
  } else if (location.hash.startsWith('#/pending')) {
    //const pendingArr = JSON.parse(localStorage.getItem('mydayapp-js-pending'));
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
    newItem(todoList)
    counter()

  } else if (location.hash.startsWith('#/')) {
    todoList.forEach(element => {
      element.visible = true

    });
    allBtn.classList.add("selected");
    completedBtn.classList.remove("selected");
    pendingBtn.classList.remove("selected");
    newItem(todoList)
    counter()
  }

}

