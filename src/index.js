import "./css/base.css";
import { loadStorage, saveStorage } from "./js/store";
import {
  todoList,
  createNewTask,
  updateTask,
  cancelActions,
  addHtmlTask,
} from "./js/utils";

// Get elements from DOM:
const main = document.getElementById("main");
const footer = document.getElementById("footer");
const inputText = document.getElementsByClassName("new-todo")[0];
const todoDOM = document.getElementsByClassName("todo-list")[0];
const todoCount = document.getElementsByClassName("todo-count")[0];
const clearButton = document.getElementsByClassName("clear-completed")[0];
const filterButtons = document
  .getElementsByClassName("filters")[0]
  .getElementsByTagName("a");

// Load the local storage and set the initial state:
inputText.autofocus = true;
todoList.addTaskList(loadStorage());
// change URL listener:
let tasksURL;
let prevUrl = undefined;
setInterval(() => {
  const URLhash = window.location.hash;
  if (URLhash != prevUrl) {
    // URL changed
    prevUrl = URLhash;
    switch (URLhash) {
      case "#/":
        tasksURL = todoList.getAllTasks();
        filterButtons[0].click();
        break;
      case "#/pending":
        tasksURL = todoList.getPendingTasks();
        filterButtons[1].click();
        break;
      case "#/completed":
        tasksURL = todoList.getCompletedTasks();
        filterButtons[2].click();
        break;
      default:
        tasksURL = todoList.getAllTasks();
        filterButtons[0].click();
        break;
    }
    updateApplication();
  }
}, 60);

// Update the application state:
const updateApplication = () => {
  //Ask if there are task in the list:
  if (!(todoList.getAllTasks().length > 0)) {
    main.setAttribute("hidden", true);
    footer.setAttribute("hidden", true);
  } else {
    main.removeAttribute("hidden", true);
    footer.removeAttribute("hidden", true);

    // Render task list:
    todoDOM.innerHTML = "";
    tasksURL.forEach((task) => {
      todoDOM.appendChild(addHtmlTask(task, updateApplication));
    });
  }

  // Confirm the clear completed button:
  const completedTasks = todoList.getCompletedTasks().length;
  if (completedTasks) clearButton.removeAttribute("hidden", true);
  else clearButton.setAttribute("hidden", true);

  // update the pending task:
  const pendingTasks = todoList.getPendingTasks().length;
  todoCount.childNodes[0].innerText = pendingTasks;
  let textItem = pendingTasks == 1 ? " item left" : " items left";
  todoCount.childNodes[1].textContent = textItem;

  // Save data in local storage:
  saveStorage(todoList.getAllTasks());
};

// --- Events listener:
// Actions key pressed:
window.addEventListener("keydown", keydownDispacher);
function keydownDispacher(event) {
  switch (event.code) {
    case "Enter":
    case "NumpadEnter":
      if (inputText === document.activeElement) createNewTask(inputText);
      else updateTask();
      updateApplication();
      break;
    case "Escape":
      cancelActions();
      break;
    default:
      break;
  }
}
// Filters event listener:
for (const btn of filterButtons) {
  btn.addEventListener("click", () => {
    for (const btn2 of filterButtons) {
      btn2.classList.remove("selected");
    }
    btn.classList.add("selected");
  });
}

// Clear button event listener:
clearButton.addEventListener("click", clearCompletedTasks);
function clearCompletedTasks() {
  todoList.clearCompletedTask();
  prevUrl = undefined;
}
