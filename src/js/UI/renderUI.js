import { template } from "src/js/template/Template";
const todoListContainer = document.querySelector(".todo-list");

export const renderUI = () => {
  todoListContainer.innerHTML = "";
  import("src/js/logic/VerifyTaskLIstArray").then((module) =>
    module.verifyTaskLIstArray()
  );
  import("src/js/UI/GetTaskFilterd").then((module) => module.getTaskFilterd());
  if (location.hash.startsWith("#/pending")) {
    import("src/js/data/Tasks")
      .then((module) => module.taskPlanner.getPendingTasks())
      .then((result) => todoListContainer.append(...template(result)));
  } else if (location.hash.startsWith("#/completed")) {
    import("src/js/data/Tasks")
      .then((module) => module.taskPlanner.getCompletedTasks())
      .then((result) => todoListContainer.append(...template(result)));
  } else {
    import("src/js/data/Tasks")
      .then((module) => module.taskPlanner.getTasks())
      .then((result) => todoListContainer.append(...template(result)));
  }
  // const view = template(taskIterator);
  // todoListContainer.append(...view);

  import("src/js/UI/ItemLeft").then((module) => module.itemLeft());
};
