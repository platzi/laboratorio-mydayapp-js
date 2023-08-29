import "./css/base.css";

import { sayHello } from "./js/utils";

console.log(sayHello("Hello"));

const mainSection = document.getElementById("main");
const footer = document.getElementById("footer");

function GetTasks() {
  const TaskList = JSON.parse(localStorage.getItem("Task-List"));

  if (TaskList) {
    return TaskList;
  } else {
    return {};
  }
}

function RenderTasks() {
  const TaskList = GetTasks();

  if (Object.keys(TaskList).length === 0) {
    mainSection.style.display = "none";
    footer.style.display = "none";
  }
}

RenderTasks();
