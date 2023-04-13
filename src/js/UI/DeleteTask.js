export const deleteTask = ({ target: { offsetParent: liContainer } }) => {
  const id = liContainer.dataset.id;
  import("src/js/data/Tasks").then((module) =>
    module.taskPlanner.removeTask(id)
  );
  import("src/js/logic/setterLocalStorage").then((module) =>
    module.setterLocalStorage()
  );
  import("src/js/UI/renderUI").then((module) => module.renderUI());
};
