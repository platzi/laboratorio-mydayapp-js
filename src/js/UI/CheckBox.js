export const setCheckBox = ({ target: { offsetParent: liContainer } }) => {
  import("src").then((module) =>
    module.todoListContainer.classList.toggle("completed")
  );
  const id = liContainer.dataset.id;
  import("src/js/data/Tasks").then((module) =>
    module.taskPlanner.toggleCompleted(id)
  );
  import("src/js/logic/VerifyTaskLIstArray").then((module) =>
    module.verifyTaskLIstArray()
  );
  import("src/js/logic/setterLocalStorage").then((module) =>
    module.setterLocalStorage()
  );
  import("src/js/UI/renderUI").then((module) => module.renderUI());
};
