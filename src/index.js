import "./css/base.css";
import { checkStorage, addNewTodo } from "./js/store";
import { render, hiddenTag } from "./js/utils";

// document.querySelector('.todo-count').children[0]; => todo count

const storageData = checkStorage();
const data = {
  totalTodos: storageData.length,
  todos: storageData,
};

if (!data.totalTodos) {
  hiddenTag();
} else render(data.todos);

document.querySelector(".new-todo").addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value.trim().length > 0) {
    const newTodo = {
      todo: e.target.value.trim(),
      state: "pending",
    };
    e.target.value = "";
    addNewTodo(newTodo);
    render();
  }
});
