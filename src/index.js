import "./css/base.css";

const footer = document.querySelector("footer");
const list = document.querySelector(".todo-list");
const main = document.querySelector(".main");
const input = document.querySelector(".new-todo");
const count = document.querySelector(".todo-count");
const clearAll = document.querySelector(".clear-completed");
const tabs = Array.from(document.querySelectorAll("a"));

let todos = [];
setInterval(() => {
  if (getTodosFromLocalStorage() === null) {
    todos = [];
  } else {
    todos = getTodosFromLocalStorage();
  }
}, 1);

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    removeClass();
    e.target.classList.add("selected");
    if (e.target.textContent == "Pending") {
      todos = getTodosFromLocalStorage().filter((todo) => !todo.completed);
      list.innerHTML = "";
      todos.forEach((todo) => {
        list.appendChild(createTodo(todo.title, todo.id, todo.completed));
      });
    }
    if (e.target.textContent == "Completed") {
      todos = getTodosFromLocalStorage().filter((todo) => todo.completed);
      list.innerHTML = "";
      todos.forEach((todo) => {
        list.appendChild(createTodo(todo.title, todo.id, todo.completed));
      });
    }
    if (e.target.textContent == "All") {
      todos = getTodosFromLocalStorage();
      list.innerHTML = "";
      todos.forEach((todo) => {
        list.appendChild(createTodo(todo.title, todo.id, todo.completed));
      });
    }
  });
});

function removeClass() {
  tabs.forEach((tab) => {
    tab.classList.remove("selected");
  });
}

if (main.style.display != "none") {
  clearAll.style.display = "block";
}

if (localStorage.length === 0 || getTodosFromLocalStorage().length === 0) {
  footer.style.display = "none";
  main.style.display = "none";
}

window.onload = () => {
  const todos = getTodosFromLocalStorage();
  if (!todos || todos.length === 0) {
    footer.style.display = "none";
    main.style.display = "none";
    clearAll.style.display = "none";
  } else {
    todos.forEach((todo) => {
      const newtodo = createTodo(todo.title, todo.id, todo.completed);
      list.appendChild(newtodo);
    });
    const uncompleted = todos.filter((todo) => !todo.completed);
    const completed = todos.filter((todo) => todo.completed === true);
    count.innerHTML = `<strong>${uncompleted.length}</strong> items left`;
    if (completed.length === 0) {
      clearAll.style.display = "none";
    }
  }
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const title = input.value.trim();
    const trimmedTitle = title.trim();
    if (title !== "") {
      if (!preventDuplicate(todos, title)) {
        const newtodo = createTodo(trimmedTitle, title);
        list.appendChild(newtodo);
        addTodoToStorage(trimmedTitle, trimmedTitle);
        footer.style.display = "block";
        main.style.display = "block";
        clearAll.style.display = "block";
        input.value = "";
      }
      updateLocalStorage(todos);
      count.innerHTML = `<strong>${todos.length}</strong> items left`;
    }
  }
});

function checked(input) {
  clearAll.style.display = "block";
  const todos = getTodosFromLocalStorage();
  const uncompleted = todos.filter((todo) => todo.completed === false);
  const completed = todos.find(
    (todo) => todo.title === input.parentElement.childNodes[1].textContent
  );
  if (input.checked) {
    input.parentElement.parentElement.classList.add("completed");
    completed.completed = true;
    count.innerHTML = `<strong>${uncompleted.length - 1}</strong> items left`;
    updateLocalStorage(todos);
  } else {
    input.parentElement.parentElement.classList.remove("completed");
    count.innerHTML = `<strong>${uncompleted.length + 1}</strong> items left`;
    completed.completed = false;
    updateLocalStorage(todos);
  }
}

function edit(label) {
  label.parentElement.parentElement.classList.add("editing");
  label.parentElement.nextSibling.focus();
}

function editFinished(input) {
  const initialValue = input.target.previousSibling.childNodes[1].textContent;
  const text = input.target.value.trim();
  const todos = getTodosFromLocalStorage();
  const editing = todos.find((todo) => todo.title === initialValue);
  if (input.key === "Enter") {
    if (input.target.value !== "") {
      input.target.previousSibling.childNodes[1].textContent = text;
      editing.title = input.target.value.trim();
      editing.id = input.target.value;
      updateLocalStorage(todos);
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
    return todo;
  }
}

function preventDuplicate(actual, newItem) {
  if (actual.find((item) => item.title === newItem)) {
    return true;
  }
}

function destroyTodo(button) {
  const todos = getTodosFromLocalStorage();
  let completed = todos.filter((todo) => todo.completed === true);
  const index = todos.findIndex(
    (todo) => todo.id === button.parentElement.parentElement.id
  );
  todos.splice(index, 1);
  updateLocalStorage(todos);
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
  if (completed.length == 0) {
    clearAll.style.display = "none";
  }
}

function destroyAll() {
  clearAll.style.display = "none";
  let todos = getTodosFromLocalStorage();
  let uncompleted = todos.filter((todo) => todo.completed === false);
  let completed = todos.filter((todo) => todo.completed === true);
  localStorage.setItem("mydayapp-js", JSON.stringify([...uncompleted]));
  list.innerHTML = "";
  uncompleted.forEach((todo) => {
    const newTodo = createTodo(todo.title, todo.title);
    list.appendChild(newTodo);
  });
  if (completed.length == 0) {
    clearAll.style.display = "none";
  }
  if (uncompleted.length == 0) {
    footer.style.display = "none";
    main.style.display = "none";
  }
}

clearAll.onclick = () => {
  destroyAll();
  removeClass();
  tabs[0].classList.add("selected");
};

function updateLocalStorage(todos) {
  localStorage.setItem("mydayapp-js", JSON.stringify([...todos]));
}

function getTodosFromLocalStorage() {
  return JSON.parse(localStorage.getItem("mydayapp-js"));
}

function addTodoToStorage(title, id) {
  todos.push({
    title: title,
    id: id,
    completed: false,
  });
}
