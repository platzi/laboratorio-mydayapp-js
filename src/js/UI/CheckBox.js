import { verifyTaskLIstArray } from "../logic/VerifyTaskLIstArray";
import { setterLocalStorage } from "../logic/setterLocalStorage";
import { $todoListContainer } from "../node/node";

import { taskPlanner } from "../data/Tasks";
import { renderUI } from "./renderUI";

export const setCheckBox = ({ target: { offsetParent: liContainer } }) => {
  $todoListContainer.classList.toggle("completed");
  const id = liContainer.dataset.id;
  taskPlanner.toggleCompleted(id);
  verifyTaskLIstArray();
  setterLocalStorage();
  renderUI();
};
