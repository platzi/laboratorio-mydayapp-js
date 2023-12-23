import "./css/base.css";

import { TaskManager } from "./js/localStorage";
import { nodes } from "./js/nodes";

const taskManager = new TaskManager();

// taskManager.addTask({ id: "123", title: "New Task", completed: true });
// taskManager.addTask({ id: "124", title: "New Task 1", completed: true });
// taskManager.addTask({ id: "125", title: "New Task 2", completed: true });
// taskManager.addTask({ id: "126", title: "New Task 3", completed: false });
// taskManager.addTask({ id: "129", title: "New Task 4", completed: false });
// taskManager.addTask({ id: "130", title: "New Task 5", completed: false });
// taskManager.deleteTask("123");
// taskManager.deleteTask("124");
// taskManager.deleteTask("125");
// taskManager.updateTask("129", "Updated");
// taskManager.updateTask("130", "New");
// taskManager.updateTask("130", "Another text");
// console.log(taskManager.getTasks());

function addNewTask(event) {
  const taskTitle = event.target.value.trim();

  if (taskTitle !== "") {
    const randomId = Math.random().toString(36).substr(2, 5);
    taskManager.addTask({
      id: randomId,
      title: taskTitle,
      completed: false,
    });
  }
}

function createTaskNode({ id, title, completed }) {
  const listItem = document.createElement("li");
  const taskDiv = document.createElement("div");
  const taskInput = document.createElement("input");
  const taskLabel = document.createElement("label");
  const taskButton = document.createElement("button");
  const editTaskInput = document.createElement("input");

  taskDiv.classList.add("view");
  taskInput.type = "checkbox";
  taskInput.classList.add("toggle");
  taskLabel.textContent = title;
  taskButton.classList.add("destroy");
  editTaskInput.classList.add("edit");
  editTaskInput.setAttribute("value", title);

  taskInput.addEventListener("click", () => {
    if (taskInput.hasAttribute("checked")) {
      taskInput.removeAttribute("checked");
    } else {
      taskInput.setAttribute("checked", "checked");
    }

    taskManager.updateTaskStatus(id);
    renderTasks();
  });

  taskLabel.addEventListener("dblclick", () => {
    // listItem.classList.remove(...listItem.classList);
    listItem.classList.add("editing");
  });

  if (completed) {
    listItem.classList.add("completed");
    taskInput.setAttribute("checked", "checked");
  }

  taskDiv.append(taskInput, taskLabel, taskButton);
  listItem.append(taskDiv, editTaskInput);

  return listItem;
}

function renderTasks() {
  nodes.taskList.innerHTML = "";

  taskManager.getTasks().forEach((task) => {
    const taskItem = createTaskNode(task);
    nodes.taskList.appendChild(taskItem);
  });
}

nodes.newTaskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNewTask(event);
    renderTasks();
    nodes.newTaskInput.value = "";
  }
});

renderTasks();
console.log(taskManager.getTasks());
console.log(nodes.taskList.classList);
