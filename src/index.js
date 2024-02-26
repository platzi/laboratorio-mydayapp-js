import "./css/base.css";
import * as node from "./js/nodes.js";

// feat main and footer should not be displayed when there's no todos
function checkTodoTask(element) {
  const childrenArray = Array.from(element.children);
  if (childrenArray.length > 0) {
    unhideMainAndFooter();
  } else {
    hideMainAndFooter();
  }
}

function hideMainAndFooter() {
  node.main.classList.add("hidden");
  node.footer.classList.add("hidden");
}

function unhideMainAndFooter() {
  node.main.classList.remove("hidden");
  node.footer.classList.remove("hidden");
}

checkTodoTask(node.todoList);

// feat adding new task
const newTodoInput = document.querySelector(
  "body > section > header > div > input"
);

function addNewTodo(todo) {
  if (newTodoInput.value.trim() !== "") {
    createTodo(todo);
    newTodoInput.value = "";
    checkTodoTask(node.todoList);
  } else {
    return;
  }
}

newTodoInput.addEventListener("keydown", (e) => {
  const newTodoText = newTodoInput.value;
  if (e.key === "Enter") {
    addNewTodo(newTodoText);
  }
});

function createTodo(label) {
  const list = document.createElement("li");
  const todoContainer = document.createElement("div");
  const toggleInput = document.createElement("input");
  const labelElement = document.createElement("label");
  const deleteButton = document.createElement("button");
  const editInput = document.createElement("input");

  todoContainer.classList.add("view");
  toggleInput.classList.add("toggle");
  toggleInput.type = "checkbox";
  labelElement.textContent = label;
  deleteButton.classList.add("destroy");
  editInput.classList.add("edit");
  editInput.value = label;

  todoContainer.append(toggleInput, labelElement, deleteButton);
  list.append(todoContainer, editInput);

  node.todoList.append(list);

  toggleInput.addEventListener("click", () => {
    if (toggleInput.checked) {
      list.classList.add("completed");
    } else {
      list.classList.remove("completed");
    }
  });

  labelElement.addEventListener("dblclick", () => {
    if (
      !editInput.classList.contains("editing") &&
      !list.classList.contains("completed")
    ) {
      list.classList.add("editing");
      editInput.focus();
    } else {
      return;
    }
  });

  deleteButton.addEventListener("click", () => {
    list.remove();
  });
  editInput.addEventListener("keydown", (e) => {
    const newTodo = editInput.value.trim();
    if (newTodo.length > 0 && e.key === "Enter") {
      labelElement.textContent = newTodo.trim();
      list.classList.remove("editing");
    } else if (e.key === "Enter") {
      list.classList.remove("editing");
      editInput.value = labelElement.textContent;
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      list.classList.remove("editing");
      editInput.value = labelElement.textContent;
    }
  });
}
