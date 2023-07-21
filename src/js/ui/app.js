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


newTodo.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const task = event.target.value.trim();
    event.target.value = "";
    addTask(todoList, task);
  }
})
