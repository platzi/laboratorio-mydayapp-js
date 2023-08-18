import "./css/base.css";

import { sayHello } from "./js/utils";

console.log(sayHello("Hello"));

const input = document.getElementById("inputTodo");
const mainContainer = document.getElementById("main");
const footer = document.getElementById("footer");
const ul = document.getElementById("todoList");
// window.addEventListener("hashchange", () => countTodos(todosList));
let todosList = [];
const localStorageData = localStorage.getItem("mydayapp-js");
if (localStorageData) {
  todosList = JSON.parse(localStorageData);
  updateTodos(todosList);
  countTodos(todosList);
} else {
  mainContainer.style.display = "none";
  footer.style.display = "none";
}

console.log(todosList);

//verificar si lo que se escribe en el input es una entrada valida:
const verifyInputValue = (event) => {
  const inputValue = event.target.value.trim() === "" ? null : event.target.value.trim();

  if (inputValue === null) {
    alert("por favor, escribe una tarea.");
  } else {
    saveTodo(inputValue);
  }
};
input.addEventListener("change", verifyInputValue);

//proceso para guardar los todos en el localStorage:
function saveTodo(todoName) {
  let newsTodos = [];
  const newTodo = {
    id: todoName,
    title: todoName,
    completed: false,
  };

  todosList.push(newTodo);
  console.log(newsTodos);
  localStorage.setItem("mydayapp-js", JSON.stringify(todosList));
  updateTodos(todosList);
  input.value = "";
  console.log(localStorage.getItem("mydayapp-js"));
  countTodos(todosList);
}

function updateTodos(array) {
  const todos = array
    .map((item) => {
      return `
    <li id="${item.id}" class=${item.completed ? "completed" : "pending"}>
      <div class="view">
      <input id="${item.id}" class="toggle" type="checkbox" ${item.completed ? "checked" : ""} />
        <label id="${item.id}">${item.title}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value=${item.title} />
    </li>`;
    })
    .join("");

  ul.innerHTML = todos;
}

//evento
ul.addEventListener("click", function (event) {
  if (event.target.nodeName === "INPUT") {
    changeTodoState(event);
  }
  if (event.target.nodeName === "BUTTON") {
    deleteItem(event);
  }
});

function changeTodoState(item) {
  console.log(item);
  console.log(todosList);
  let li = document.querySelectorAll("li.pending, li.completed");
  li = [...li];
  console.log(li);
  const current = li.find((element) => element.id === item.target.id);

  console.log(item.target.checked);
  const todosStateToggle = todosList.map((todo) => {
    if (todo.id === item.target.id) {
      if (todo.completed === true) {
        current.classList.remove("completed");
        current.classList.add("pending");
        todo.completed = false;
      } else {
        current.classList.remove("pending");
        current.classList.add("completed");
        todo.completed = true;
      }
    }
    return todo;
  });
  todosList = [...todosStateToggle];
  countTodos(todosList);
  localStorage.setItem("mydayapp-js", JSON.stringify(todosList));
}

let labels = document.getElementsByTagName("label");

labels = [...labels];

labels.forEach((item) => {
  item.addEventListener("dblclick", (event) => {
    editTodo(event);
  });
});

function editTodo(element) {
  const label = element.target;
  console.log(label.textContent);

  let li = document.querySelectorAll("li.pending, li.completed");
  li = [...li];

  const todoClicked = li.filter((element) => element.id === label.id);
  const todoClickedId = todoClicked[0].id;
  const todo = document.getElementById(todoClickedId);
  console.log(todo);
  const labelText = label.textContent;
  const inputEdit = todo.querySelector(".edit");
  inputEdit.value = labelText;
  console.log(todosList);

  if (todo.classList.contains("completed")) {
    todo.classList.remove("completed");
    todo.classList.add("editing");
    inputEdit.focus();
    inputEdit.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        label.textContent = inputEdit.value.trim();

        todosList = todosList.map((item) => {
          if (item.id === todo.id) {
            item.title = label.textContent;
            item.id = label.textContent;
          }
          return item;
        });
        console.log(todosList);
        localStorage.setItem("mydayapp-js", JSON.stringify(todosList));
        todo.classList.remove("editing");
        todo.classList.add("completed");
      } else if (event.key === "Escape") {
        label.textContent = label.textContent.trim();
        todo.classList.remove("editing");
        todo.classList.add("completed");
      }
    });
  } else if (todo.classList.contains("pending")) {
    todo.classList.remove("pending");
    todo.classList.add("editing");

    inputEdit.focus();
    inputEdit.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        label.textContent = inputEdit.value.trim();
        todosList = todosList.map((item) => {
          if (item.id === todo.id) {
            item.title = label.textContent;
            item.id = label.textContent;
          }
          return item;
        });
        console.log(todosList);
        localStorage.setItem("mydayapp-js", JSON.stringify(todosList));
        todo.classList.remove("editing");
        todo.classList.add("pending");
      } else if (event.key === "Escape") {
        label.textContent = label.textContent.trim();
        todo.classList.remove("editing");
        todo.classList.add("pending");
      }
    });
  }
}

function deleteItem(element) {
  console.log(element);
  const previousElementId = element.target.previousElementSibling.textContent;
  console.log(previousElementId);
  const todoIndex = todosList.findIndex((todo) => {
    return todo.id === previousElementId;
  });
  console.log(todoIndex);
  todosList.splice(todoIndex, 1);
  localStorage.setItem("mydayapp-js", JSON.stringify(todosList));
  updateTodos(todosList);
  countTodos(todosList);
}

function countTodos(items) {
  let counterParagraph = footer.querySelector(".todo-count");
  const filtersContainer = document.getElementsByClassName("filters")[0];
  const strongTag = counterParagraph.getElementsByTagName("strong")[0];
  const length = items.length;
  strongTag.textContent = length;
  if (length > 1 || length === 0) {
    counterParagraph.textContent = "";
    const spanText = document.createTextNode(" items left");
    counterParagraph.appendChild(strongTag);
    counterParagraph.appendChild(spanText);
  } else {
    counterParagraph.textContent = "";
    const spanText = document.createTextNode(" item left");
    counterParagraph.appendChild(strongTag);
    counterParagraph.appendChild(spanText);
  }
  let anchors = filtersContainer.querySelectorAll("a");
  anchors = [...anchors];
  const pendingTodos = items.filter((item) => item.completed === false).length;
  const completedTodos = items.filter((item) => item.completed === true).length;
  console.log(anchors, pendingTodos, completedTodos);

  anchors.forEach((element) => {
    if (element.getAttribute("href") === "#/pending") {
      // let newStrongTag = document.createElement("strong");
      // newStrongTag.textContent = pendingTodos;
      element.innerHTML = `<strong>${pendingTodos}</strong> Pending`;
    } else if (element.getAttribute("href") === "#/completed") {
      element.innerHTML = `<strong>${completedTodos}</strong> Completed`;
    }
  });
}
