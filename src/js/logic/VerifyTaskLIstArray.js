import { taskPlanner } from "../data/Tasks";
import { $clearCompleted, $footer, $main } from "../node/node";

export const verifyTaskLIstArray = () => {
  const tasks = taskPlanner.getTasks();
  if (tasks.length === 0) {
    $main.classList.add("hidden");
    $footer.classList.add("hidden");
  } else {
    $main.classList.remove("hidden");
    $footer.classList.remove("hidden");

    const someCompleted = tasks.some((task) => task.completed == true);
    someCompleted
      ? $clearCompleted.classList.remove("hidden")
      : $clearCompleted.classList.add("hidden");
  }
};
