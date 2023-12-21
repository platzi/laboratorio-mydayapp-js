import {
  handleHashChange,
  createTodo,
  removeAllCompletedTodos,
} from "./routes";

const INPUT_TODO_TEXT_BOX = "new_todo_description";
const BUTTON_CLEAN_COMPLETED = "clear_completed_button";

export const addEventToToDoInput = (toDosCollection) => {
  const todoInput = document.getElementById(INPUT_TODO_TEXT_BOX);
  if (!todoInput) return;

  todoInput.addEventListener("keydown", (event) =>
    handleNewToDoInput(event, toDosCollection)
  );
};

export const addHashListenerToDocument = (toDosCollection) => {
  window.addEventListener("hashchange", () =>
    handleHashChange(toDosCollection)
  );
};

export const addCompletedCleanerListenerToButton = (toDosCollection) => {
  const button = document.getElementById(BUTTON_CLEAN_COMPLETED);
  if (!button) return;

  button.addEventListener("click", () =>
    removeAllCompletedTodos(toDosCollection)
  );
};

const handleNewToDoInput = (event, toDosCollection) => {
  const title = event.target.value.trim();
  if (event.key != "Enter") return;
  if (title == "") return;

  createTodo(title, toDosCollection);
  event.target.value = "";
};
