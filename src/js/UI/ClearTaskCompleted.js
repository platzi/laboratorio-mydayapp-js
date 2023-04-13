export const clearTaskCompleted = () => {
  import("src/js/data/Tasks").then((module) =>
    module.taskPlanner.clearTaskCompleted()
  );
  import("src/js/logic/setterLocalStorage").then((module) =>
    module.setterLocalStorage()
  );
  import("src/js/UI/renderUI").then((module) => module.renderUI());
};
