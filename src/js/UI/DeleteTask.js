import { setterLocalStorage } from "../logic/setterLocalStorage";
import { renderUI } from "../UI/renderUI";
import { taskPlanner } from "../data/Tasks";

export const deleteTask = ({ target: { offsetParent: liContainer } }) => {
  const id = liContainer.dataset.id;
  taskPlanner.removeTask(id);
  setterLocalStorage();
  renderUI();
};
