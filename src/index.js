import "./css/base.css";
import Task from "./js/Task.class";
import TaskList from "./js/TaskList.class";
import { loadStorage, saveStorage } from "./js/store";
import { renderTaskList, selectedTask } from "./js/utils";

// Get elements from DOM:
const main = document.getElementById("main");
const footer = document.getElementById("footer");
const todoList = document.getElementsByClassName("todo-list")[0];
const inputText = document.getElementsByClassName("new-todo")[0];
inputText.autofocus = true;

// Read the local storage
const arrayTasks = loadStorage();
const taskList = new TaskList(arrayTasks);

// Events listener:
window.addEventListener("keydown", keydownDispacher);
function keydownDispacher(event) {
  //console.log(event.code);
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
      }
      if (selectedTask.childNodes[1] === document.activeElement) {
        let taskId = taskList.getTaskById(selectedTask.id);
        let newValue = selectedTask.childNodes[1].value.trim();
        taskId.setTitle(newValue);
        selectedTask.removeAttribute("class");
      }
      // saveStorage(taskList.getAllTasks());
      updateApplication();
      break;
    case "Escape":
      if (selectedTask) selectedTask.removeAttribute("class");
      break;
    default:
      break;
  }
}

// Update the application state:
const updateApplication = () => {
  const tasks = taskList.getAllTasks();
  //Ask if there are task in the list:
  if (!(tasks.length > 0)) {
    main.setAttribute("hidden", true);
    footer.setAttribute("hidden", true);
  } else {
    main.removeAttribute("hidden", true);
    footer.removeAttribute("hidden", true);
    // Render task list:
    renderTaskList(tasks, todoList, updateApplication);
  }
};

updateApplication();

// console.log(taskList.getFilteredTasks("HaCeR"));
// console.log(taskList.getPendingTasks());
// console.log(taskList.getCompletedTasks());

//taskList.clearCompletedTask();
//console.log(taskList.getAllTasks());
// saveStorage(taskList.getAllTasks());
// const storage = loadStorage();
// console.log("Storage", storage);
