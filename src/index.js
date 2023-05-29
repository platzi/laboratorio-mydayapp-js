import "./css/base.css";
import { addItem } from "./js/utils";

const wrapper = document.querySelector(".todoapp-wrapper");
const todoListItems = JSON.parse(localStorage.getItem("todoList")) ?? [];

const inputAddTodo = document.querySelector(".new-todo");
const todoList = document.querySelector(".todo-list");
const todoCount = document.querySelector(".todo-count")

/* First Render */
if(todoListItems.length === 0) {
  const children = Array.from(wrapper.children)
  children.forEach(child => {
    child.classList.add('hidden')
  });
} else {
  const auxList = document.createDocumentFragment();
  
  todoListItems.forEach(item => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class=${item.completed ? "completed" : "view"} id=${item.id}>
        <input class="toggle" type="checkbox">
        <label>${item.title}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value=${item.title}>
    `;
    auxList.appendChild(listItem)
  })

  todoList.appendChild(auxList)
  todoCount.children[0].textContent = todoListItems.length
}

inputAddTodo.addEventListener("keydown", function (e) {
  const todoText = e.target.value.trim();

  if (e.key === "Enter" && todoText.length > 0) {
    if(todoListItems.length === 0) {
      const children = Array.from(wrapper.children)
      children.forEach(child => {
        child.classList.remove('hidden')
      });
    }
    const listItem = document.createElement("li");

    addItem({
      id: Date.now(),
      title: todoText,
      completed: false,
    }, todoListItems)

    listItem.innerHTML = `
      <div class="view">
        <input class="toggle" type="checkbox">
        <label>${todoText}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value=${todoText}>
    `;

    todoList.appendChild(listItem);
    inputAddTodo.value = "";
    todoCount.children[0].textContent = todoListItems.length
  }
});
