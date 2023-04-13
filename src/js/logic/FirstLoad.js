import { taskPlanner } from "../data/Tasks";
import { verifyTaskLIstArray } from "./VerifyTaskLIstArray";
import { renderUI } from "../UI/renderUI";
import {
  getterLocalStorage,
  setterLocalStorage,
} from "../logic/setterLocalStorage.js"; //la logica empleada para la primera carga de la aplicacion

export const firstLoad = () => {
  const tasks = getterLocalStorage();

  if (!tasks || !tasks.length) {
    setterLocalStorage();
    verifyTaskLIstArray();
  } else {
    tasks.forEach((task) => taskPlanner.addTask(task));
    verifyTaskLIstArray();
    renderUI();
  }
  removeEventListener("load", firstLoad);
};
