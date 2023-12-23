import "./css/base.css";

import { TaskManager } from "./js/localStorage";
import { nodes } from "./js/nodes";

const taskManager = new TaskManager();

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
  const deleteTaskButton = document.createElement("button");
  const editTaskInput = document.createElement("input");

  taskDiv.classList.add("view");
  taskInput.type = "checkbox";
  taskInput.classList.add("toggle");
  taskLabel.textContent = title;
  deleteTaskButton.classList.add("destroy");
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
    listItem.classList.add("editing");
    editTaskInput.focus();
  });

  editTaskInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      listItem.classList.remove("editing");
    } else if (event.key === "Enter") {
      taskManager.updateTask(id, event.target.value.trim());
      renderTasks();
    }
  });

  deleteTaskButton.addEventListener("click", () => {
    taskManager.deleteTask(id);
    renderTasks();
  });

  if (completed) {
    listItem.classList.add("completed");
    taskInput.setAttribute("checked", "checked");
  }

  taskDiv.append(taskInput, taskLabel, deleteTaskButton);
  listItem.append(taskDiv, editTaskInput);

  return listItem;
}

function renderTasks() {
  nodes.taskList.innerHTML = "";

  taskManager.getTasks().forEach((task) => {
    const taskItem = createTaskNode(task);
    nodes.taskList.appendChild(taskItem);
  });

  setCounter();
}

function setCounter() {
  nodes.counter.innerHTML = "";

  const tasksCount = taskManager.getTasks().length;
  const strongElement = document.createElement("strong");
  let textNode, text;

  strongElement.textContent = tasksCount;
  text = tasksCount === 1 ? " item left" : " items left";
  textNode = document.createTextNode(text);
  nodes.counter.append(strongElement, textNode);
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
