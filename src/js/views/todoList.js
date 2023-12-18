import { todoItem } from "./todoItem";

const LIST_ID = "todo-list";

export const renderNewList = (toDos) => {
  const todoList = document.getElementById(LIST_ID);
  if (!todoList) return;
  todoList.innerHTML = "";

  toDos.filteredToDos.forEach((toDo) => {
    const todoItemElement = todoItem(toDo, toDos);
    todoList.appendChild(todoItemElement);
  });
};

export const renderAppendList = (toDo, toDos) => {
  const todoList = document.getElementById(LIST_ID);
  if (!todoList) return;

  const todoItemElement = todoItem(toDo, toDos);
  todoList.appendChild(todoItemElement);
};
