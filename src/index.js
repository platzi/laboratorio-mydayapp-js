import "./css/base.css";
import Task from "./js/Task.class";
import TaskList from "./js/TaskList.class";
import { loadStorage, saveStorage } from "./js/store";

// Get elements from DOM:
const main = document.getElementById("main");
const footer = document.getElementById("footer");
const todoList = document.getElementsByClassName("todo-list")[0];
const inputText = document.getElementsByClassName("new-todo")[0];
console.log(inputText);
inputText.autofocus = true;

// Read the local storage
const arrayTasks = loadStorage();
const taskList = new TaskList(arrayTasks);

// Events listener:
window.addEventListener("keydown", keydownDispacher);
function keydownDispacher(event) {
  switch (event.code) {
    case "Enter":
    case "NumpadEnter":
      if (inputText === document.activeElement) {
        let data = inputText.value.trim();
        if (data.length > 3) {
          const task = new Task({
            id: taskList.getNextID(),
            title: data,
          });
          inputText.value = "";
          taskList.addTask(task);
        }
        // saveStorage(taskList.getAllTasks());
        updateApplication();
      }
      break;
    default:
      break;
  }
}

// Update the application state:
const updateApplication = () => {
  //Ask if there are task in the list:
  if (!(taskList.getAllTasks().length > 0)) {
    main.setAttribute("hidden", true);
    footer.setAttribute("hidden", true);
  } else {
    main.removeAttribute("hidden", true);
    footer.removeAttribute("hidden", true);
    renderTask(taskList.getAllTasks()[0]);
  }
};

// Render the tasks into the list:
function renderTask(task) {
  const li = document.createElement("li");
  const divLi = document.createElement("div");
  const inputDiv = document.createElement("input");
  const labelDiv = document.createElement("label");
  const buttonDiv = document.createElement("button");
  const inputLi = document.createElement("input");

  if (task.completed) li.className = "completed";
  divLi.className = "view";
  inputDiv.className = "toggle";
  inputDiv.type = "checkbox";
  if (task.completed) inputDiv.setAttribute("checked", true);
  labelDiv.innerText = task.title;
  buttonDiv.className = "destroy";
  divLi.appendChild(inputDiv);
  divLi.appendChild(labelDiv);
  divLi.appendChild(buttonDiv);
  inputLi.className = "edit";
  inputLi.value = "Buy a unicorn";
  li.appendChild(divLi);
  li.appendChild(inputLi);
  todoList.append(li);
}


updateApplication();

// console.log(taskList.getFilteredTasks("HaCeR"));
// console.log(taskList.getPendingTasks());
// console.log(taskList.getCompletedTasks());

// console.log(taskList.getAllTasks());
//taskList.clearCompletedTask();
//console.log(taskList.getAllTasks());
// saveStorage(taskList.getAllTasks());
// const storage = loadStorage();
// console.log("Storage", storage);
