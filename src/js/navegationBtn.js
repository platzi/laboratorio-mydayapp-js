import { todoList } from "..";
import { completedTodos } from "..";
import { pendingTodos } from "..";
import { newItem } from "./newItem";
import { counter } from "./counter";

export function navegation() {
  // completedTodos.splice(0, completedTodos.length)
  // pendingTodos.splice(0, pendingTodos.length)

  //localStorage
  const localArr = JSON.parse(localStorage.getItem('mydayapp-js'));

  //completedTodos
  const completedArr = localArr.filter(item => item.completed === true);
  localStorage.setItem("mydayapp-js-completed", JSON.stringify(completedArr));

  //pendingTodos
  const fiterPendingArr = localArr.filter(item => item.completed === false);
  localStorage.setItem("mydayapp-js-pending", JSON.stringify(fiterPendingArr));


  if (location.hash.startsWith('#/completed')) {
    const completedArrGet = JSON.parse(localStorage.getItem('mydayapp-js-completed'));
    newItem(completedArrGet, true);
    counter(1)


  } else if (location.hash.startsWith('#/pending')) {
    const pendingArr = JSON.parse(localStorage.getItem('mydayapp-js-pending'));
    newItem(pendingArr, false)
    counter(2)

  } else if (location.hash.startsWith('#/')) {

    newItem(localArr, false)
    counter(0)
  }

}

