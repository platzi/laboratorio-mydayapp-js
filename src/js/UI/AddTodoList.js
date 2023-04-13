import { taskPlanner } from "../data/Tasks";
import { setterLocalStorage } from "../logic/setterLocalStorage";
import { renderUI } from "./renderUI";
import { idGenerator } from "../logic/idGenerator";

export const addTodoList = (text) => {
  const id = idGenerator();
  let newTask = {
    id: id,
    title: text,
    completed: false,
  };
  taskPlanner.addTask(newTask);
  setterLocalStorage();
  renderUI();
};
