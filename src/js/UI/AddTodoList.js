import { taskPlanner } from "../data/Tasks";
import { setterLocalStorage } from "../logic/setterLocalStorage";
import { renderUI } from "./renderUI";
import { idGenerator } from "../logic/idGenerator";

export const addTodoList = (text) => {
  // let taskList = taskPlanner.getTasks();
  const id = idGenerator();
  let newTask = {
    id: id,
    title: text,
    completed: false,
  };
  // taskList = [...taskList, newTask];
  taskPlanner.addTask(newTask);
  setterLocalStorage();
  renderUI();
};
