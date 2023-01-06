import "./css/base.css";

import { sayHello } from "./js/utils";
import { newItem } from "./js/newItem";

let newTodo = document.querySelector(".new-todo");
export let todoList = [];
// const inputList = document.querySelectorAll('.toggle')
// console.log(inputList)

newTodo.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    if (newTodo.value != 0) {
      todoList.push({
        tarea: newTodo.value,
        completed: false,
      });
      newItem()
    } else {
      alert("Write something")
    }
  }

});
