import "./css/base.css";

const footer = document.querySelector("footer");
const list = document.querySelector(".todo-list");
const main = document.querySelector(".main");
const input = document.querySelector(".new-todo");
const count = document.querySelector(".todo-count");
const clearAll = document.querySelector(".clear-completed");
console.log(count);
const todos = [];
console.log(todos);
if (main.style.display != "none") {
  clearAll.style.display = "block";
}

if (
  localStorage.length === 0 ||
  JSON.parse(localStorage.getItem("mydayapp-js")).length === 0
) {
  footer.style.display = "none";
  main.style.display = "none";
}

window.onload = () => {
  const todos = JSON.parse(localStorage.getItem("mydayapp-js"));
  const uncompleted = todos.filter((todo) => todo.completed === false);
  count.innerHTML = `<strong>${uncompleted.length}</strong> items left`;
  uncompleted.forEach((todo) => {
    const newtodo = createTodo(todo.title, todo.id, todo.completed);
    list.appendChild(newtodo);
  });
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    footer.style.display = "block";
    main.style.display = "block";
    const title = input.value.trim();
    const trimmedTitle = title.trim();
    if (title !== "") {
      if (!preventDuplicate(todos, title)) {
        const newtodo = createTodo(trimmedTitle, title);
        list.appendChild(newtodo);
      }
      count.innerHTML = `<strong>${todos.length}</strong> items left`;
    }
    input.value = "";
    localStorage.setItem("mydayapp-js", JSON.stringify([...todos]));
    clearAll.style.display = "block";
    console.log(todos);
  }
});
function checked(input) {
  clearAll.style.display = "block";
  const todos = JSON.parse(localStorage.getItem("mydayapp-js"));
  const uncompleted = todos.filter((todo) => todo.completed === false);
  const completed = todos.find(
    (todo) => todo.title === input.parentElement.childNodes[1].textContent
  );
  if (input.checked) {
    input.parentElement.parentElement.classList.add("completed");
    console.log(completed);
    completed.completed = true;
    count.innerHTML = `<strong>${uncompleted.length - 1}</strong> items left`;
    localStorage.setItem("mydayapp-js", JSON.stringify([...todos]));
  } else {
    input.parentElement.parentElement.classList.remove("completed");
    count.innerHTML = `<strong>${uncompleted.length + 1}</strong> items left`;
    completed.completed = false;
    localStorage.setItem("mydayapp-js", JSON.stringify([...todos]));
  }
}

function edit(label) {
  label.parentElement.parentElement.classList.add("editing");
  label.parentElement.nextSibling.focus();
}
function editFinished(input) {
  const initialValue = input.target.previousSibling.childNodes[1].textContent;
  const text = input.target.value.trim();
  const todos = JSON.parse(localStorage.getItem("mydayapp-js"));
  const editing = todos.find((todo) => todo.title === initialValue);
  if (input.key === "Enter") {
    if (input.target.value !== "") {
      input.target.previousSibling.childNodes[1].textContent = text;
      editing.title = input.target.value;
      editing.id = input.target.value;
      localStorage.setItem("mydayapp-js", JSON.stringify([...todos]));
      input.target.parentElement.classList.remove("editing");
    }
  }
  if (input.key === "Escape") {
    input.target.parentElement.classList.remove("editing");
  }
}
function createTodo(title, id, completed = false) {
  let todo = document.createElement("li");
  todo.id = id;
  let div = document.createElement("div");
  div.classList.add("view");
  let mark = document.createElement("input");
  mark.type = "checkbox";
  mark.classList.add("toggle");
  mark.onclick = (e) => {
    checked(e.target);
  };
  if (completed) {
    todo.classList.add("completed");
    mark.checked = true;
  }
  let label = document.createElement("label");
  label.innerText = title.trim();
  label.ondblclick = (e) => {
    edit(e.target);
  };
  let destroy = document.createElement("button");
  destroy.classList.add("destroy");
  destroy.onclick = (e) => {
    destroyTodo(e.target);
  };
  let hiddenInput = document.createElement("input");
  hiddenInput.classList.add("edit");
  hiddenInput.value = title;
  hiddenInput.onkeydown = (e) => {
    editFinished(e);
  };
  div.appendChild(mark);
  div.appendChild(label);
  div.appendChild(destroy);
  todo.appendChild(div);
  todo.appendChild(hiddenInput);
  if (title != "") {
    todos.push({
      title: title,
      id: title,
      completed: false,
    });
    return todo;
  }
}

function preventDuplicate(actual, newItem) {
  if (actual.find((item) => item.title === newItem)) {
    return true;
  }
}

function destroyTodo(button) {
  let todos = JSON.parse(localStorage.getItem("mydayapp-js"));
  const index = todos.findIndex(
    (todo) => todo.id === button.parentElement.parentElement.id
  );
  todos.splice(index, 1);
  localStorage.setItem("mydayapp-js", JSON.stringify([...todos]));
  list.innerHTML = "";
  todos.forEach((todo) => {
    const newtodo = createTodo(todo.title, todo.title);
    list.appendChild(newtodo);
    count.innerHTML = `<strong>${todos.length}</strong> items left`;
  });
  if (todos.length == 0) {
    footer.style.display = "none";
    main.style.display = "none";
    localStorage.clear();
  }
}

function destroyAll() {
  clearAll.style.display = "none";
  let todos = JSON.parse(localStorage.getItem("mydayapp-js"));
  let uncompleted = todos.filter((todo) => todo.completed === false);
  console.log(uncompleted);
  localStorage.setItem("mydayapp-js", JSON.stringify([...uncompleted]));
  list.innerHTML = "";
  uncompleted.forEach((todo) => {
    const newTodo = createTodo(todo.title, todo.title);
    list.appendChild(newTodo);
  });
  if (todos.length != 0) {
    clearAll.style.display = "block";
  }
  if (uncompleted.length == 0) {
    footer.style.display = "none";
    main.style.display = "none";
  }
}

clearAll.onclick = () => {
  destroyAll();
};
