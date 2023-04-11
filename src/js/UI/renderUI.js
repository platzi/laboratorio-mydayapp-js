import { verifyTaskLIstArray } from "../logic/VerifyTaskLIstArray";
import { $todoListContainer } from "../node/node";
import { getTaskFilterd } from "./GetTaskFilterd";
import { taskPlanner } from "../data/Tasks";
import { itemLeft } from "./ItemLeft";
import { template } from "../template/Template";

export const renderUI = () => {
  let taskIterator = [];
  $todoListContainer.innerHTML = "";
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
  // taskIterator
  //   .map((task) => {
  //     const liContainer = template(task);
  //     container.push(liContainer);
  //   })
  //   .join("");
  // $todoListContainer.append(...container);
  $todoListContainer.innerHTML = view;
  itemLeft();
};
