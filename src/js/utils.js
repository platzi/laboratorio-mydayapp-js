class Task {
  constructor({ id, title, completed = false }) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
  setId(id) {
    this.id = String(id);
  }
  setTitle(title) {
    this.title = title;
  }
  toggleState() {
    this.completed = !this.completed;
  }
}
class TaskList {
  constructor() {
    this._taskList = [];
  }
  addTask(task) {
    task.setId(this._taskList.length);
    this._taskList.push(task);
  }
  addTaskList(arrayTasks = []) {
    this._taskList = [];
    if (arrayTasks.length >= 1) {
      arrayTasks.forEach((task, index) => {
        task.setId(index);
        this.addTask(task);
      });
    }
  }
  deleteTask(id) {
    let newArrayTasks = this._taskList.filter((task) => task.id != id);
    this.addTaskList(newArrayTasks);
  }
  clearCompletedTask() {
    let newArrayTasks = this._taskList.filter((task) => !task.completed);
    this.addTaskList(newArrayTasks);
  }
  getTaskById(id) {
    return this._taskList.filter((task) => task.id == id)[0];
  }
  getAllTasks() {
    return this._taskList;
  }
  getPendingTasks() {
    return this._taskList.filter((task) => !task.completed);
  }
  getCompletedTasks() {
    return this._taskList.filter((task) => task.completed);
  }
  getFilteredTasks(title) {
    let filteredTask = this._taskList.filter((task) => {
      let taskTitle = task.title.toUpperCase();
      return taskTitle.includes(title.toUpperCase());
    });
    return filteredTask;
  }
}
const todoList = new TaskList();
let selectedTask;

const createNewTask = (inputText) => {
  let data = inputText.value.trim();
  if (data.length > 2) {
    const task = new Task({
      title: data,
    });
    inputText.value = "";
    todoList.addTask(task);
  }
};

const updateTask = () => {
  if (selectedTask && selectedTask.childNodes[1] === document.activeElement) {
    let taskId = todoList.getTaskById(selectedTask.id);
    let newValue = selectedTask.childNodes[1].value.trim();
    taskId.setTitle(newValue);
    selectedTask.removeAttribute("class");
  }
};

const cancelActions = () => {
  if (selectedTask) selectedTask.removeAttribute("class");
};

// Create the tasks into the list:
const addHtmlTask = (task, updateView) => {
  const taskItem = document.createElement("li");
  const divLi = document.createElement("div");
  const inputDiv = document.createElement("input");
  const labelDiv = document.createElement("label");
  const buttonDiv = document.createElement("button");
  const inputLi = document.createElement("input");

  taskItem.id = task.id;
  if (task.completed) {
    taskItem.className = "completed";
    inputDiv.setAttribute("checked", true);
  }
  divLi.className = "view";
  inputDiv.className = "toggle";
  inputDiv.type = "checkbox";
  inputDiv.addEventListener("click", () => {
    task.toggleState();
    updateView();
  });
  labelDiv.innerText = task.title;
  labelDiv.addEventListener("dblclick", () => {
    if (selectedTask) selectedTask.removeAttribute("class");
    selectedTask = document.getElementById(task.id);
    selectedTask.className = "editing";
    selectedTask.childNodes[1].focus();
  });
  buttonDiv.className = "destroy";
  buttonDiv.addEventListener("click", () => {
    todoList.deleteTask(task.id);
    updateView();
  });

  divLi.appendChild(inputDiv);
  divLi.appendChild(labelDiv);
  divLi.appendChild(buttonDiv);
  taskItem.appendChild(divLi);

  inputLi.className = "edit";
  inputLi.value = task.title;
  taskItem.appendChild(inputLi);

  return taskItem;
};

export { todoList, createNewTask, updateTask, cancelActions, addHtmlTask };
