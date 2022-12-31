const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const inputNewTodo = document.querySelector(".new-todo");
const todoListContainer = document.querySelector(".todo-list");
const todoCount = document.querySelector(".todo-count");
const clearCompleted = document.querySelector(".clear-completed");
let taskListArray = [];

const getterLocalStorage = JSON.parse(localStorage.getItem('mydayapp-js'));

//events
clearCompleted.addEventListener("click", clearTaskCompleted);
inputNewTodo.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    inputValue(inputNewTodo);
  };
});

export function firstLoad() {  
  if (getterLocalStorage === null) {
    verifyTaskLIstArray();
  } else {
    taskListArray = [...getterLocalStorage];    
    renderUI();    
  };
};

//utils
function verifyTaskLIstArray() {
  if (taskListArray.length === 0) {
    main.classList.add("hidden");
    footer.classList.add("hidden");
  } else {
    main.classList.remove("hidden");
    footer.classList.remove("hidden");    
  };
};

function clearInput() {
  inputNewTodo.value = "";
};

function setterLocalStorage() {
  localStorage.setItem("mydayapp-js", JSON.stringify(taskListArray));
  console.log(taskListArray);
};

//logic add Task
const inputValue = () => {
  const text = inputNewTodo.value.trim().toLowerCase();
  if (text !== "") {
    clearInput();
    addTodoList(text);
  } else {
    clearInput();
  }
};


function addTodoList(text) {
  const id = (taskListArray.length + 1).toString();
  let newTask = {
    id: id,
    title: text,
    completed: false,
  };
  taskListArray = [...taskListArray, newTask];
  setterLocalStorage();
  renderUI();
};

//UI interface
function deleteTask(deleteIcon) {
  const path = deleteIcon.path[2]; // liContainer para acceder al dataset donde se almaceno el ID  
  const taskId = path.dataset.id;
  taskListArray = taskListArray.filter((task) => task.id != taskId);
  setterLocalStorage();
  renderUI();
}

function editingMode(edit) {
  const path = edit.path[2]// liContainer para acceder al dataset donde se almaceno el ID
  const taskId = edit.path[2].dataset.id; 
  const inputEditValue = e.path[0].value;
  console.log(e.path[1].nextSibling);
  e.path[2].classList.toggle("editing");
  e.path[1].nextSibling.addEventListener("keydown", editingTask);
}

const editingTask = (e) => {
  console.log(inputEditValue);
  if (e.key === "Enter") {
    const found = taskListArray.findIndex((index) => index.id == taskId);
  } else if (e.key === "Escape") {
    e.path[1].classList.toggle("editing");
  }
};

function checkBox(checkboxToggle) {  
  const path = checkboxToggle.path[2] // liContainer para acceder al dataset donde se almaceno el ID
  const taskId = path.dataset.id;
  path.classList.toggle("completed");
  const found = taskListArray.findIndex((index) => index.id == taskId);
  taskListArray[found].completed === false
    ? (taskListArray[found].completed = true)
    : (taskListArray[found].completed = false);
    console.log(taskListArray)
    setterLocalStorage();
}

function clearTaskCompleted() {
  taskListArray = taskListArray.filter((task) => task.completed !== true);
  renderUI();
}

function renderUI() {
  todoListContainer.innerHTML = "";
  verifyTaskLIstArray();
  const container = [];
  taskListArray.forEach((task) => {
    const liContainer = template(task);
    container.push(liContainer);
  });
  todoListContainer.append(...container);
  itemLeft();
}

//template
function template(task) {
  const liContainer = document.createElement("li");
  const divView = document.createElement("div");
  const inputCheckBox = document.createElement("input");
  const labelTask = document.createElement("label");
  const btnDestroy = document.createElement("button");
  const inputEdit = document.createElement("input");
  liContainer.dataset.id = task.id;
  divView.classList.add("view");
  inputCheckBox.classList.add("toggle");
  inputCheckBox.addEventListener("click", checkBox);
  inputCheckBox.type = "checkbox";

  if (task.completed === true) {
    inputCheckBox.checked = true;
    liContainer.classList.add("completed");
  } else if (task.completed === false) {
    inputCheckBox.checked = false;
    liContainer.classList.remove("completed");
  }

  labelTask.innerText = task.title;
  labelTask.addEventListener("dblclick", editingMode);

  btnDestroy.classList.add("destroy");
  btnDestroy.addEventListener("click", deleteTask);

  inputEdit.autofocus = true;
  inputEdit.focus();
  inputEdit.classList.add("edit");
  inputEdit.value = task.title;

  divView.append(inputCheckBox, labelTask, btnDestroy);
  liContainer.append(divView, inputEdit);
  return liContainer;
}
//Funciones
function itemLeft() {
  let item;
  taskListArray.length > 1 ? (item = "items") : (item = "item");
  todoCount.innerHTML = `<strong>${taskListArray.length}</strong> ${item} left`;
}
