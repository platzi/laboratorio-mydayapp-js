import { taskPlanner } from "../data/Tasks";
import { setterLocalStorage } from "../logic/setterLocalStorage";
import { renderUI } from "./renderUI";

export const addTodoList = (text) => {
  let taskList = taskPlanner.getTasks();
  const id = (taskList.length + 1).toString();
  let newTask = {
    id: id,
    title: text,
    completed: false,
  };
  taskList = [...taskList, newTask];
  taskPlanner.addTask(taskList);
  setterLocalStorage();
  renderUI();
};
