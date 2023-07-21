import showTasks from "../adapters/showTasks.adapter";
import taskUseCase from "../useCases/task.useCase";


const taskService = new taskUseCase();
const newTodo = document.querySelector(".new-todo");

const todoList = [];

function refreshUI() {
  showTasks(todoList);
}

function addTask(taskList, task) {
  taskService.addTask(taskList, task);
  refreshUI();
}

function taskChageState(taskList, id) {
  taskService.chageState(taskList, id);
  refreshUI();
}

function deleteTask(taskList, id) {
  taskService.deleteTask(taskList, id);
  refreshUI();
}


newTodo.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const task = event.target.value.trim();
    event.target.value = "";
    addTask(todoList, task);
  }
});

document.addEventListener("stateChanged", (event) => {
  const { id } = event.detail;
  taskChageState(todoList, id);
})

document.addEventListener("deleteTask", (event) => {
  const { id } = event.detail;
  deleteTask(todoList, id);
})
