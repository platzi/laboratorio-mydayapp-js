const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const inputNewTodo = document.querySelector(".new-todo");
const todoListContainer = document.querySelector(".todo-list");
const todoCount = document.querySelector(".todo-count");
const clearCompleted = document.querySelector(".clear-completed");

export function verifyTaskLIstArray() {
  if (localStorage.length === 0) {
    main.classList.add("hidden");
    footer.classList.add("hidden");
} else {
    main.classList.remove("hidden");
    footer.classList.remove("hidden");
    renderUI();
}};

clearCompleted.addEventListener("click", clearTaskCompleted);
inputNewTodo.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    inputValue(inputNewTodo);
  }
});

const inputValue = () => {
  const text = inputNewTodo.value.trim();
  if (text !== "") {
    clearInput();
    addTodoList(text);
  } else {
    clearInput();
  }
};

function clearInput() {
  inputNewTodo.value = "";
}

function addTodoList(text) {
    let taskListArray = []
    if (localStorage.length !== 0) {
        [ taskListArray ] = localStorage.getItem('mydayapp-js')
    }
  const id = (localStorage.length + 1).toString();
  let newTask = {
    id: id,
    title: text,
    completed: false,
  };
  taskListArray = [...taskListArray, newTask];
  localStorage.setItem('mydayapp-js', JSON.stringify(taskListArray))
  console.log(localStorage.getItem('mydayapp-js'));
  renderUI();
}

function deleteTask(e) {
  const taskId = e.path[2].dataset.id;
  taskListArray = taskListArray.filter((task) => task.id != taskId);
  renderUI();
}

function editingMode(e) {
  const taskId = e.path[2].dataset.id;
  const inputEditValue = e.path[0].value;
  console.log(e.path[1].nextSibling);
  e.path[2].classList.toggle("editing");
  e.path[1].nextSibling.addEventListener("keydown", editingTask);
}

const editingTask = (e) => {
  console.log(inputEditValue);
  if (e.key === "Enter") {
    const found = taskListArray.findIndex((index) => index.id == taskId);
  } else if (e.ket === "Escape") {
    e.path[1].classList.toggle("editing");
  }
};

function checkBox(e) {
  const taskId = e.path[2].dataset.id;
  e.path[2].classList.toggle("completed");
  const found = taskListArray.findIndex((index) => index.id == taskId);
  taskListArray[found].status === "pending"
    ? (taskListArray[found].status = "completed")
    : (taskListArray[found].status = "pending");
}

function clearTaskCompleted() {
  taskListArray = taskListArray.filter((task) => task.status !== "completed");
  renderUI();
}

function renderUI() {
  todoListContainer.innerHTML = "";
  verifyTaskLIstArray();
  const container = [];
  const task = JSON.parse(localStorage.getItem('mydayapp-js'))
  console.log(task);
  task.forEach((task) => {
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
