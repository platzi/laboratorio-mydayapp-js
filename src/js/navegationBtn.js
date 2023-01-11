import { todoList } from "..";
import { newItem } from "./newItem";
import { counter } from "./counter";

export function navegation() {

  if (location.hash.startsWith('#/completed')) {
    //const completedArrGet = JSON.parse(localStorage.getItem('mydayapp-js-completed'));
    todoList.forEach(element => {
      if (element.completed === false) {
        element.visible = false
      } else {
        element.visible = true

      }
    });
    newItem(todoList);
    counter(1)
  } else if (location.hash.startsWith('#/pending')) {
    //const pendingArr = JSON.parse(localStorage.getItem('mydayapp-js-pending'));
    todoList.forEach(element => {
      if (element.completed === true) {
        element.visible = false
      } else {
        element.visible = true

      }
    });
    newItem(todoList)
    counter(2)

  } else if (location.hash.startsWith('#/')) {
    todoList.forEach(element => {
      element.visible = true

    });
    newItem(todoList)
    counter(0)
  }

}

