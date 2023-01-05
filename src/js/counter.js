import { todoList } from "..";
export function counter() {
  const span = document.querySelector(".todo-count")
  const strong = document.querySelector("strong")

  if (todoList.length === 0) {
    return
  }
  else if (todoList.length != 1) {
    span.innerHTML = ""
    span.append(`${todoList.length} items`);
  } else {
    span.innerHTML = "";
    span.append(`${todoList.length} item`);
  };
}