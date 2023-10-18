export const renderTaskList = (tasks, todoList, updateView) => {
  todoList.innerHTML = "";
  tasks.forEach((task) => {
    todoList.appendChild(createTask(task, updateView));
  });
};

// Create the tasks into the list:
const createTask = (task, updateView) => {
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
    let ref = document.getElementById(task.id);
    ref.className = "editing";
  });
  buttonDiv.className = "destroy";

  divLi.appendChild(inputDiv);
  divLi.appendChild(labelDiv);
  divLi.appendChild(buttonDiv);
  taskItem.appendChild(divLi);

  inputLi.className = "edit";
  inputLi.value = task.title;
  taskItem.appendChild(inputLi);

  return taskItem;
};
