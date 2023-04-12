import { verifyTaskLIstArray } from "../logic/VerifyTaskLIstArray";
import { getTaskFilterd } from "./GetTaskFilterd";
import { taskPlanner } from "../data/Tasks";
import { itemLeft } from "./ItemLeft";
import { template } from "../template/Template";
import { todoListContainer } from "../..";

export const renderUI = () => {
  let taskIterator = [];
  todoListContainer.innerHTML = "";
  verifyTaskLIstArray();
  getTaskFilterd();
  if (location.hash.startsWith("#/pending")) {
    taskIterator = taskPlanner.getPendingTasks();
  } else if (location.hash.startsWith("#/completed")) {
    taskIterator = taskPlanner.getCompletedTasks();
  } else {
    taskIterator = taskPlanner.getTasks();
  }
  const view = template(taskIterator);
  todoListContainer.append(...view);

  itemLeft();
};
