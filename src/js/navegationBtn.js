import { todoList } from "..";
import { completedTodos } from "..";
import { pendingTodos } from "..";
import { newItem } from "./newItem";

export function navegation() {
  completedTodos.splice(0, completedTodos.length)
  pendingTodos.splice(0, pendingTodos.length)


  if (location.hash.startsWith('#/completed')) {
    completedList()
    newItem(completedTodos, true);

  } else if (location.hash.startsWith('#/pending')) {
    pendingList()
    newItem(pendingTodos);
  } else if (location.hash.startsWith('#/')) {
    newItem(todoList)
  }

  function completedList() {
    console.log("funcion 1");
    todoList.forEach(item => {
      if (item.completed === true) {
        completedTodos.push(item);
        console.log("TODOS COMPLETADOS", completedTodos);
      }
    })
  }
  function pendingList() {
    console.log("funcion 2");
    todoList.forEach(item => {
      if (item.completed === false) {
        pendingTodos.push(item);
        console.log("TODOS PENDIENTES", pendingTodos);

      }
    })
  }
}