import { TODOS, getTodo, addTodo, updateTodo, deleteTodo } from "./store"
import { todoTemplateCreator, todoCounterTemplateCreator } from "./templates"

export const renderTodo = (TODO) => {
  // Creacion de nodo
  const $todoElement = document.createElement(null);
  const todoTemplate = todoTemplateCreator(TODO);
  $todoElement.innerHTML = todoTemplate;
  // Agrega eventos al nodo
  const $todoStatusCheckbox = $todoElement.querySelector("input.toggle");
  const $todoLabel = $todoElement.querySelector("label");
  const $todoEditInput = $todoElement.querySelector("input.edit");
  const $todoDeleteButton = $todoElement.querySelector("button.destroy");
  $todoStatusCheckbox.addEventListener("change", (e) => updateTodoStatus(TODO.id, e.target.checked));
  $todoLabel.addEventListener("dblclick", () => activateTodoEditMode(TODO.id));
  $todoEditInput.addEventListener("focusout", () => disableTodoEditMode(TODO.id));
  $todoEditInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") updateTodoText(TODO.id, e.target.value);
    if (e.key === "Escape") $todoEditInput.blur();
  })
  $todoDeleteButton.addEventListener("click", () => deleteTodoController(TODO.id));
  // Agrega nodo al HTML
  const $todoList = document.querySelector(".todo-list");
  $todoList.appendChild($todoElement.firstElementChild);
  // Hacer visible contenedor HTML de TODOS
  const $todosContainer = document.querySelector(".todoapp-wrapper")
  if ($todosContainer.classList.contains("hidden")) $todosContainer.classList.remove("hidden");
  // Actualiza contador de TODOS
  updateTodoCounter();
}

export const addTodoController = (text) => {
  // Validacion de texto
  const newTodoText = text.trim();
  if (!newTodoText) return;
  // Agrega TODO al estado global
  const newTodo = addTodo(newTodoText);
  // Renderizar TODO
  renderTodo(newTodo)
  // Gestiona la visibilidad del boton "clear completed"
  visibilityToClearCompletedTodos()
}

export const deleteTodoController = (todoId) => {
  // Elimina TODO del estado global
  deleteTodo(todoId);
  // ElImina elemento HTML correspondiente al TODO
  const $todoContainer =  document.querySelector(`li[data-todo-id="${todoId}"]`);
  $todoContainer.remove();
  // Ocultar contenedor HTML de TODOS (si no hay tareas)
  const $todosContainer = document.querySelector(".todoapp-wrapper")
  if (TODOS.length == 0) $todosContainer.classList.add("hidden");
  // Actualiza contador de TODOS
  updateTodoCounter();
  // Gestiona la visibilidad del boton "clear completed"
  visibilityToClearCompletedTodos()
}

export const deleteCompletedTodos = () => {
  // Obtiene los TODOS completados y los elimina individualmente
  const completedTodos = TODOS.filter(TODO => TODO.completed);
  completedTodos.forEach(TODO => deleteTodoController(TODO.id));
}

export const updateTodoText = (todoId, text) => {
  // Validacion de texto
  const newTodoText = text.trim();
  if (!newTodoText) return;
  // Actualiza TODO en el estado global
  updateTodo(todoId, { title: newTodoText });
  // Actualiza TODO en el HTML y deshabilita modo edicion
  const $todoContainer =  document.querySelector(`li[data-todo-id="${todoId}"]`);
  const $todoLabel =  $todoContainer.querySelector(`label`);
  const $todoEditInput =  $todoContainer.querySelector(`input.edit`);
  $todoLabel.innerHTML = newTodoText;
  $todoEditInput.blur();
}

export const updateTodoStatus = (todoId, isCompleted) => {
  // Actualizar TODO en el estado global
  updateTodo(todoId, { completed: isCompleted });
  // Modificando estilos de HTML
  const $todoContainer = document.querySelector(`li[data-todo-id="${todoId}"]`);
  if (isCompleted) $todoContainer.classList.add("completed");
  else $todoContainer.classList.remove("completed");
  // Gestiona la visibilidad del boton "clear completed"
  visibilityToClearCompletedTodos()
}

export const activateTodoEditMode = (todoId) => {
  /// Modificando estilos de HTML
  const $todoContainer = document.querySelector(`li[data-todo-id="${todoId}"]`);
  $todoContainer.classList.add("editing");
  // Establece foco en input de edicion y como valor el texto actual del TODO
  const $todoEditInput = $todoContainer.querySelector("input.edit");
  $todoEditInput.value = getTodo(todoId).title;
  $todoEditInput.focus();
}

export const disableTodoEditMode = (todoId) => {
  // Modificando estilos de HTML
  const $todoContainer =  document.querySelector(`li[data-todo-id="${todoId}"]`);
  $todoContainer.classList.remove("editing");
}

export const updateTodoCounter = () => {
  // Crea plantilla para el contador de TODOS y actualiza su contenedor HTML
  const $todoCounterLabel = document.querySelector(".todo-count");
  const todoCounterTemplate = todoCounterTemplateCreator(TODOS.length);
  $todoCounterLabel.innerHTML = todoCounterTemplate
}

export const visibilityToClearCompletedTodos = () => {
  // Aplica visibilidad al boton si existen TODOS que hayan sido completados
  const $clearCompletedTodosButton = document.querySelector(".clear-completed");
  const completedTodos = TODOS.filter(TODO => TODO.completed);
  if (completedTodos.length == 0) $clearCompletedTodosButton.classList.add("hidden")
  else $clearCompletedTodosButton.classList.remove("hidden")
}