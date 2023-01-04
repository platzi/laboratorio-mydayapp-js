import "./css/base.css";

import { sayHello } from "./js/utils";
import { newItem } from "./js/newItem";

let newTodo = document.querySelector(".new-todo");

newTodo.addEventListener("keydown", (e) => {
  if (e.code === "Enter")
    newItem(newTodo.value);

})
