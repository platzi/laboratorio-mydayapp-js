import { idGenerator } from "src/js/logic/idGenerator";

export const addTodoList = (text) => {
  const id = idGenerator();
  let newTask = {
    id: id,
    title: text,
    completed: false,
  };
  import("src/js/data/Tasks").then((module) =>
    module.taskPlanner.addTask(newTask)
  );
  import("src/js/logic/setterLocalStorage").then((module) =>
    module.setterLocalStorage()
  );
  import("src/js/UI/renderUI").then((module) => module.renderUI());
};
