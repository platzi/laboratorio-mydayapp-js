import { addTodo, updateTodo } from "./store"
import { todoTemplateCreator } from "./templates"

export const addTodoController = (text) => {
  // Validacion de texto
  const newTodoText = text.trim();
  if (!newTodoText) return;
  // Agrega TODO al estado global
  const newTodo = addTodo(newTodoText);
  // Creacion de nodo
  const $todoElement = document.createElement(null);
  const todoTemplate = todoTemplateCreator(newTodo);
  $todoElement.innerHTML = todoTemplate;
  // Agrega eventos al nodo
  const $todoStatusCheckbox = $todoElement.querySelector("input.toggle");
  $todoStatusCheckbox.addEventListener("change", (e) => updateTodoStatus(newTodo.id, e.target.checked));
  // Agrega nodo al HTML
  const $todoList = document.querySelector(".todo-list");
  $todoList.appendChild($todoElement.firstElementChild);
}

export const updateTodoStatus = (todoId, isCompleted) => {
  // Actualizar TODO en el estado global
  updateTodo(todoId, { completed: isCompleted });
  // Modificando estilos de HTML
  const $todoContainer = document.querySelector(`li[data-todo-id="${todoId}"]`);
  if (isCompleted) $todoContainer.classList.add("completed");
  else $todoContainer.classList.remove("completed");
}