import {
  getLocalStorage,
  saveLocalStorage,
  removeFromLocalStorage,
} from "./store";

let TODOS = getLocalStorage();

function addTodo({ id, title, completed }) {
  let TODO = {
    id: id ? id : getNextID(),
    title: title,
    completed: completed ? completed : false,
  };
  var todo = document.createElement("li");
  todo.setAttribute("id", `item_${TODO.id}`);

  var containerDiv = document.createElement("div");
  containerDiv.classList.add("view");

  var checkbox = document.createElement("input");
  checkbox.setAttribute("class", "toggle");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("value", TODO.id);
  checkbox.checked = TODO.completed;
  if (checkbox.checked) todo.classList.toggle("completed");
  checkbox.addEventListener("click", (event) => {
    todo.classList.toggle("completed");
    let item = TODOS.find((el) => el.id === Number(TODO.id));
    item.completed = event.target.checked;
    saveLocalStorage(TODOS);
    updateCounter();
    checkForCompletedTask();
  });

  // Handles edit
  let edit = document.createElement("input");
  edit.setAttribute("type", "edit");
  edit.setAttribute("class", "hidden");
  edit.value = TODO.title.trim();
  edit.setAttribute("id", TODO.id);
  edit.addEventListener("keydown", (event) => {
    let originalValue = label.innerText;
    if (event.code === "Enter") {
      label.innerText = edit.value;
      let todoIndex = TODOS.findIndex(
        (todo) => todo.id === Number(event.target.id)
      );
      TODOS[todoIndex].title = edit.value.trim();
      saveLocalStorage(TODOS);
      event.target.value = event.target.value.trim();
      todo.classList.remove("editing");
      checkbox.classList.toggle("hidden");
      edit.classList.add("hidden");
      edit.classList.remove("edit");
      toggleTodos(`item_${event.target.id}`);
    } else if (event.code === "Escape") {
      label.innerText = originalValue;
      event.target.value = originalValue;

      event.target.value = event.target.value.trim();
      todo.classList.remove("editing");
      checkbox.classList.toggle("hidden");
      edit.classList.add("hidden");
      edit.classList.remove("edit");
      toggleTodos(`item_${event.target.id}`);
    }
  });
  var label = document.createElement("label");
  label.innerText = TODO.title;
  label.addEventListener("dblclick", (event) => {
    toggleTodos(event.path[2].id);
    todo.classList.add("editing");
    checkbox.classList.toggle("hidden");
    edit.classList.remove("hidden");
    edit.classList.add("edit");
    edit.focus();
  });

  // Handles remove
  var button = document.createElement("button");
  button.setAttribute("class", "destroy");
  button.setAttribute("id", TODO.id);
  button.addEventListener("click", () => {
    todo.remove();
    removeFromLocalStorage(button.id);
  });

  containerDiv.appendChild(checkbox);
  containerDiv.appendChild(label);
  containerDiv.appendChild(button);
  todo.appendChild(containerDiv);
  todo.appendChild(edit);

  let todos = document.querySelector(".todo-list");
  todos.appendChild(todo);
  addTask(TODO);
}

function toggleTodos(id) {
  let todos = Array.from(document.querySelectorAll("li"));
  todos
    .filter((todo) => todo.id !== id)
    .map((element) => element.classList.toggle("hidden"));
}

function updateCounter() {
  let ul = document.getElementsByClassName("todo-list")[0];
  let pendingTasks = Array.from(ul.children).filter(
    (task) => !task.classList.contains("completed")
  );

  let todoCounter = document.getElementsByClassName("todo-count")[0];
  todoCounter.children[0].innerHTML = pendingTasks.length;
  let itemsText = pendingTasks.length === 1 ? "item" : "items";
  todoCounter.innerHTML = todoCounter.innerHTML.replace(
    /\bitem(s)?\b/,
    itemsText
  );
}

function checkForCompletedTask() {
  let clearCompletedButton =
    document.getElementsByClassName("clear-completed")[0];
  let ul = document.getElementsByClassName("todo-list")[0];
  let pendingTasks = Array.from(ul.children).filter((task) =>
    task.classList.contains("completed")
  );
  if (pendingTasks.length >= 1) {
    clearCompletedButton.classList.remove("hidden");
  } else clearCompletedButton.classList.add("hidden");
}

function addTask(task) {
  let alreadyInTasks = TODOS.some((element) => element.id === task.id);
  if (!alreadyInTasks) {
    TODOS.push(task);
    saveLocalStorage(TODOS);
  }
}

function getNextID() {
  let highestId = TODOS.reduce((max, object) => {
    return object.id > max ? object.id : max;
  }, 0);
  return highestId + 1;
}

function clearCompletedTasks() {
  let completedTasks = document.querySelectorAll("li.completed");
  completedTasks = Array.from(completedTasks);
  console.log(completedTasks);
  completedTasks.forEach((task) => task.remove());
  TODOS = TODOS.filter((task) => !task.completed);
  saveLocalStorage(TODOS);
}

function getFilterByRoute() {
  let filter = "";
  let hash = window.location.hash;

  if (hash.includes("pending")) return "pending";
  else if (hash.includes("completed")) return "completed";
  else filter = "all";
  return filter;
}

function filterTODOSByRoute(route) {
  let ul = document.getElementsByClassName("todo-list")[0];
  Array.from(ul.childNodes).forEach((child) => child.remove());

  route = route.includes("pending")
    ? "pending"
    : route.includes("completed")
    ? "completed"
    : "all";
  let filteredTask = getLocalStorage(route);
  filteredTask.forEach((task) => addTodo(task));
}

export {
  addTodo,
  updateCounter,
  addTask,
  clearCompletedTasks,
  checkForCompletedTask,
  getFilterByRoute,
  filterTODOSByRoute,
};
