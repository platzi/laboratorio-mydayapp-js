import { todoItem } from "./todoItem";

const LIST_ID = "todo-list";

export const renderNewList = (toDosCollection) => {
  const todoList = document.getElementById(LIST_ID);
  if (!todoList) return;
  todoList.innerHTML = "";

  toDosCollection.filteredToDos.forEach((toDo) => {
    const todoItemElement = todoItem(toDo, toDosCollection);
    todoList.appendChild(todoItemElement);
  });
};

export const renderAppendList = (toDo, toDosCollection) => {
  const todoList = document.getElementById(LIST_ID);
  if (!todoList) return;

  const todoItemElement = todoItem(toDo, toDosCollection);
  todoList.appendChild(todoItemElement);
};
