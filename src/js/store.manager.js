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
