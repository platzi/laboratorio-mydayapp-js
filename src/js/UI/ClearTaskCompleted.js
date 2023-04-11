import { setterLocalStorage } from "../logic/setterLocalStorage";
import { renderUI } from "./renderUI";
import { taskPlanner } from "../data/Tasks";

export const clearTaskCompleted = () => {
  taskPlanner.clearTaskCompleted();
  setterLocalStorage();
  renderUI();
};
