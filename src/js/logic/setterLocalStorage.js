import { taskPlanner } from "../data/Tasks";

export const setterLocalStorage = () => {
  const tasks = taskPlanner.getTasks();
  localStorage.setItem("mydayapp-js", JSON.stringify(tasks));
};

export const getterLocalStorage = () =>
  JSON.parse(localStorage.getItem("mydayapp-js"));
