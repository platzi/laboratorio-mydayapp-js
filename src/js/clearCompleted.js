import { generalTodoListGenerator, mainFooterDisplayValidator } from "./utils";

export const clearCompleted = () => {
  const todos = JSON.parse(localStorage.getItem("mydayapp-js"));

  localStorage.setItem(
    "mydayapp-js",
    JSON.stringify(todos.filter((item) => !item.completed))
  );

  generalTodoListGenerator();
  mainFooterDisplayValidator();
  clearCompletedButtonValidator();
};

export const clearCompletedButtonValidator = () => {
  const clearCompletedTarget = document.querySelector(".clear-completed");
  const completedTodosValidator = JSON.parse(
    localStorage.getItem("mydayapp-js")
  ).filter((item) => item.completed);

  clearCompletedTarget.style.visibility =
    completedTodosValidator.length < 1 ? "hidden" : "visible";
};
