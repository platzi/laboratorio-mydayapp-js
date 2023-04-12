import { clearCompleted, footer, main } from "../..";
import { taskPlanner } from "../data/Tasks";

export const verifyTaskLIstArray = () => {
  const tasks = taskPlanner.getTasks();
  if (!tasks || !tasks.length) {
    main.classList.add("hidden");
    footer.classList.add("hidden");
  } else {
    main.classList.remove("hidden");
    footer.classList.remove("hidden");

    const someCompleted = tasks.some((task) => task.completed === true);
    someCompleted
      ? clearCompleted.classList.remove("hidden")
      : clearCompleted.classList.add("hidden");
  }
};
