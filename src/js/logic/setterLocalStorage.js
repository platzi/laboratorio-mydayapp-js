export const setterLocalStorage = () => {
  import("src/js/data/Tasks")
    .then((module) => module.taskPlanner.getTasks())
    .then((tasks) =>
      localStorage.setItem("mydayapp-js", JSON.stringify(tasks))
    );
};

export const getterLocalStorage = () =>
  JSON.parse(localStorage.getItem("mydayapp-js"));
