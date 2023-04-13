export const itemLeft = () => {
  import("src/js/data/Tasks")
    .then((module) => module.taskPlanner.getPendingTasks())
    .then((items) => {
      let item;
      items.length > 1 ? (item = "items") : (item = "item");
      import("src").then(
        (module) =>
          (module.todoCount.innerHTML = `<strong>${items.length}</strong> ${item} left`)
      );
    });
};
