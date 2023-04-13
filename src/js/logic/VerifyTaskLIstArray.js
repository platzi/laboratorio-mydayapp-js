export const verifyTaskLIstArray = () => {
  import("src/js/data/Tasks")
    .then((module) => module.taskPlanner.getTasks())
    .then((tasks) => {
      if (!tasks || !tasks.length) {
        import("src").then((module) => module.main.classList.add("hidden"));
        import("src").then((module) => module.footer.classList.add("hidden"));
      } else {
        import("src").then((module) => module.main.classList.remove("hidden"));
        import("src").then((module) =>
          module.footer.classList.remove("hidden")
        );

        const someCompleted = tasks.some((task) => task.completed === true);
        someCompleted
          ? import("src").then((module) =>
              module.clearCompleted.classList.remove("hidden")
            )
          : import("src").then((module) =>
              module.clearCompleted.classList.add("hidden")
            );
      }
    });
};
