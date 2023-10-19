import { Task } from "./utils";

export const saveStorage = (arrayTasks) => {
  let tasksInfo = [];
  if (arrayTasks.length > 0) {
    arrayTasks.map((task) =>
      tasksInfo.push({
        id: task.id,
        title: task.title,
        completed: task.completed,
      })
    );
    tasksInfo = JSON.stringify(tasksInfo);
  }
  localStorage.setItem("mydayapp-js", tasksInfo);
};

export const loadStorage = () => {
  let tasksInfo = [];
  try {
    let data = localStorage.getItem("mydayapp-js");
    let parsedTask = data ? JSON.parse(data) : [];
    if (parsedTask.length > 0) {
      parsedTask.forEach((task) => {
        tasksInfo.push(new Task(task));
      });
    }
  } catch (error) {
    throw new Error("Something went wrong loading the local storage");
  }
  return tasksInfo;
};
