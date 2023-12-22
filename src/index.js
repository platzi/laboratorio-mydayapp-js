import "./css/base.css";

import { TaskManager } from "./js/localStorage";

const taskManager = new TaskManager();

taskManager.addTask({ id: "123", title: "New Task", completed: true });
taskManager.addTask({ id: "124", title: "New Task 1", completed: true });
taskManager.addTask({ id: "125", title: "New Task 2", completed: true });
taskManager.addTask({ id: "126", title: "New Task 3", completed: false });
taskManager.addTask({ id: "129", title: "New Task 4", completed: false });
taskManager.addTask({ id: "130", title: "New Task 5", completed: false });
taskManager.deleteTask("123");
taskManager.deleteTask("124");
taskManager.deleteTask("125");
taskManager.updateTask("129", "Updated");
taskManager.updateTask("130", "New");
taskManager.updateTask("130", "Another text");
console.log(taskManager.getTasks());
