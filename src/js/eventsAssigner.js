import {
  listenHashChange,
  createTodo,
  removeAllCompletedTodos,
} from "./routes";

const INPUT_TODO_TEXT_BOX = "new_todo_description";
const BUTTON_CLEAN_COMPLETED = "clear_completed_button";

export const addEventToToDoInput = (toDos) => {
  const todoInput = document.getElementById(INPUT_TODO_TEXT_BOX);
  if (!todoInput) return;

  todoInput.addEventListener("keydown", (event) =>
    handleNewToDoInput(event, toDos)
  );
};

export const addHashListenerToDocument = (ToDos) => {
  window.addEventListener("hashchange", () => listenHashChange(ToDos));
};

export const addCompletedCleanerListenerToButton = (toDos) => {
  const button = document.getElementById(BUTTON_CLEAN_COMPLETED);
  if (!button) return;

  button.addEventListener("click", () => removeAllCompletedTodos(toDos));
};

const handleNewToDoInput = (event, toDos) => {
  const title = event.target.value.trim();
  if (event.key != "Enter") return;
  if (title == "") return;

  createTodo(title, toDos);
  event.target.value = "";
};
