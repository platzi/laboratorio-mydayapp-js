import { v4 } from "uuid";
import { RegExps } from "./utils";
import { CONFIG } from "./config";

export let currentTodos = JSON.parse(
  // Get todos from local storage or create an empty array
  localStorage.getItem(CONFIG.LS_KEY) || "[]"
);

const updateLS = () => {
  localStorage.setItem(CONFIG.LS_KEY, JSON.stringify(currentTodos));
};

/**
 *
 * @param {string} inputText
 * @returns {[
 * {id: string, title: string, completed: boolean} | null,
 * boolean
 * ]} Returns the new todo and true if the todo was successfully added, otherwise,
 * returns null and false
 */
export const addTodo = (inputText) => {
  // Memove trailing or redundant spaces
  const title = inputText.replace(RegExps.redundantSpaces, " ").trim();
  if (!title) return [null, false];

  const todo = { id: v4(), title, completed: false };
  currentTodos = [...currentTodos, todo];
  updateLS();

  return [todo, true];
};

export const toggleTodoCompleted = (id) => {
  const updatedTodos = currentTodos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

  currentTodos = [...updatedTodos];
  updateLS();
};

export const removeTodo = (id) => {
  const updatedTodos = currentTodos.filter((todo) => todo.id !== id);
  currentTodos = [...updatedTodos];
  updateLS();
};

export const clearCompletedTodos = () => {
  const updatedTodos = currentTodos.filter((todo) => !todo.completed);
  currentTodos = [...updatedTodos];
  updateLS();
};

export const updateTodo = (id, inputText) => {
  const title = inputText.replace(RegExps.redundantSpaces, " ").trim();
  if (!title) return [null, false];

  const updatedTodos = currentTodos.map((todo) =>
    todo.id === id ? { ...todo, title } : { ...todo }
  );

  currentTodos = [...updatedTodos];
  updateLS();
  return [title, true];
};

export const filterTodos = (filter) => {
  switch (filter) {
    case "":
    case "all":
      return currentTodos;
    case "pending":
      return currentTodos.filter((todo) => !todo.completed);
    case "completed":
      return currentTodos.filter((todo) => todo.completed);
    default:
      return currentTodos;
  }
};
