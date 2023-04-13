import { todoCount } from "../..";
import { taskPlanner } from "../data/Tasks";

export const itemLeft = () => {
  let item;
  const items = taskPlanner.getPendingTasks();
  items.length > 1 ? (item = "items") : (item = "item");
  todoCount.innerHTML = `<strong>${items.length}</strong> ${item} left`;
};