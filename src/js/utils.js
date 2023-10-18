export let selectedTask;

export const renderTaskList = (taskList, todoList, updateView) => {
  todoList.innerHTML = "";
  const tasks = taskList.getAllTasks();
  tasks.forEach((task) => {
    todoList.appendChild(createTask(task, taskList, updateView));
  });
};

// Create the tasks into the list:
const createTask = (task, taskList, updateView) => {
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
    taskList.deleteTask(task.id);
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
