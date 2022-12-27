import "./css/base.css";
import { getRandomInt } from "./js/utils";

const TODO_ITEMS_KEY = "mydayapp-js";

if (!localStorage.getItem(TODO_ITEMS_KEY)) {
  localStorage.setItem(TODO_ITEMS_KEY, JSON.stringify([]));
}

const data = localStorage.getItem(TODO_ITEMS_KEY);

let todos = JSON.parse(data);

const listTodos = () => {
  const todoListElement = document.querySelector(".todo-list");
  todoListElement.innerHTML = "";
  todos.forEach((todo) => {
    const html = newTamplateTodo(todo);
    todoListElement.append(html);
  });

  countTodos();
  autofocus();
};

const newTamplateTodo = (payload) => {
  const liContainer = document.createElement("li");
  const divView = document.createElement("div");
  const checkBoxCompleted = document.createElement("input");
  const labelTitle = document.createElement("label");
  const buttonDelete = document.createElement("button");
  const inputEdit = document.createElement("input");

  if (payload.completed === true) {
    liContainer.classList.add("completed");
  }

  divView.classList.add("view");
  checkBoxCompleted.classList.add("toggle");
  checkBoxCompleted.setAttribute("type", "checkbox");
  checkBoxCompleted.setAttribute("data-id", payload.id);

  if (payload.completed === true) {
    checkBoxCompleted.setAttribute("checked", "checked");
  }

  labelTitle.textContent = payload.title;
  buttonDelete.classList.add("destroy");
  buttonDelete.setAttribute("data-id", payload.id);
  inputEdit.classList.add("edit");
  inputEdit.setAttribute("value", payload.title);
  inputEdit.setAttribute("data-id", payload.id);

  divView.append(checkBoxCompleted);
  divView.append(labelTitle);
  divView.append(buttonDelete);
  liContainer.append(divView);
  liContainer.append(inputEdit);

  checkBoxCompleted.addEventListener("change", (event) => {
    isCompleted(event);
  });

  labelTitle.addEventListener("dblclick", (event) => {
    event.target.parentNode.parentNode.classList.add("editing");
    inputEdit.focus();
  });

  inputEdit.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      updateTodo(event);

      // reset input state
      liContainer.classList.remove("editing");

      const newValue = event.target.value.trim();

      // Update label content
      labelTitle.textContent = newValue;
    }

    if (event.key === "Escape") {
      const id = event.target.attributes["data-id"].value;
      const data = todos.filter((todo) => todo.id === id);

      // reset input state
      liContainer.classList.remove("editing");

      // reset input edit content
      inputEdit.value = data[0].title;
    }
  });

  buttonDelete.addEventListener("click", (event) => {
    const id = event.target.attributes["data-id"].value;

    // remove element to the DOM
    event.target.parentNode.parentNode.remove();

    deleteTodo(id);
  });

  return liContainer;
};

const loadFormNewTodoEvent = () => {
  const input = document.querySelector(".new-todo");

  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const payload = {
        id: getRandomInt().toString(),
        title: input.value.trim(),
        completed: false,
      };

      newTodo(payload);

      input.value = "";
    }
  });
};

const hideMainAndFooter = () => {
  const main = document.querySelector(".main");
  const footer = document.querySelector(".footer");

  if (todos.length === 0) {
    main.setAttribute("hidden", true);
    footer.setAttribute("hidden", true);
  } else {
    main.removeAttribute("hidden");
    footer.removeAttribute("hidden");
  }
};

const deleteTodo = (id) => {
  const data = localStorage.getItem(TODO_ITEMS_KEY);
  const filterdData = JSON.parse(data).filter((todo) => todo.id !== id);
  todos = [...filterdData];
  localStorage.setItem(TODO_ITEMS_KEY, JSON.stringify(todos));

  existTodos();
};

const newTodo = (payload) => {
  todos.push(payload);

  const todosStoraged = localStorage.getItem(TODO_ITEMS_KEY);
  const items = JSON.parse(todosStoraged);
  items.push(payload);

  localStorage.setItem(TODO_ITEMS_KEY, JSON.stringify(items));

  const newHtmlElement = newTamplateTodo(payload);
  const todoListElement = document.querySelector(".todo-list");
  todoListElement.append(newHtmlElement);

  countTodos();
  hideMainAndFooter();
  existTodos();
};

const updateTodo = (event) => {
  const id = event.target.attributes["data-id"].value;
  const newTitle = event.target.value.trim();
  const data = todos.filter((todo) => todo.id === id);
  data[0].title = newTitle;

  localStorage.setItem(TODO_ITEMS_KEY, JSON.stringify(todos));
};

const isCompleted = (event) => {
  const id = event.target.attributes["data-id"].value;
  const check = event.target.checked;

  const index = todos.findIndex((todo) => todo.id === id);
  todos[index].completed = check;
  todos = [...todos];
  localStorage.setItem(TODO_ITEMS_KEY, JSON.stringify(todos));

  // Toggle class .completed on the li element
  event.target.parentNode.parentNode.classList.toggle("completed");

  countTodos();
  existTodos();
};

const existTodos = () => {
  const clearElement = document.querySelector(
    "footer > button.clear-completed"
  );
  const completedTodos = todos.filter((todo) => todo.completed === true);
  completedTodos.length === 0
    ? clearElement.classList.add("hidden")
    : clearElement.classList.remove("hidden");
};

const countTodos = () => {
  const counterElement = document.querySelector(".todo-count");
  const todosStoraged = localStorage.getItem(TODO_ITEMS_KEY);
  const items = JSON.parse(todosStoraged);

  const pending = items.reduce(function (count, currentValue) {
    return currentValue.completed === false && ++count, count;
  }, 0);
  counterElement.innerHTML = `${
    pending === 1 ? `${pending} item` : `${pending} items left`
  }`;
};

const autofocus = () => {
  const input = document.querySelector(".new-todo");
  input.focus();
};

const clearCompleteTodos = () => {
  const data = localStorage.getItem(TODO_ITEMS_KEY);
  const filterdData = JSON.parse(data).filter(
    (todo) => todo.completed === false
  );
  todos = [...filterdData];

  localStorage.setItem(TODO_ITEMS_KEY, JSON.stringify(todos));
  listTodos();
  existTodos();
};

const loadClearCompletedEvent = () => {
  const clearElement = document.querySelector(
    "footer > button.clear-completed"
  );

  clearElement.addEventListener("click", () => {
    clearCompleteTodos();
  });
};

const filterByPending = () => {
  const data = localStorage.getItem(TODO_ITEMS_KEY);
  const filteredData = JSON.parse(data).filter(
    (todo) => todo.completed === false
  );
  todos = [...filteredData];

  listTodos();
};

const filterByCompleted = () => {
  const data = localStorage.getItem(TODO_ITEMS_KEY);
  const filteredData = JSON.parse(data).filter(
    (todo) => todo.completed === true
  );
  todos = [...filteredData];

  listTodos();
};

const filterByAll = () => {
  const data = localStorage.getItem(TODO_ITEMS_KEY);
  const filteredData = JSON.parse(data);
  todos = [...filteredData];

  listTodos();
};

const loadFilterButtons = () => {
  const linkPendingElement = document.querySelector(
    "ul.filters > li:nth-child(2) a"
  );
  const linkCompletedElement = document.querySelector(
    "ul.filters > li:nth-child(3) a"
  );
  const linkAllElement = document.querySelector(
    "ul.filters > li:nth-child(1) a"
  );

  linkPendingElement.addEventListener("click", () => {
    linkPendingElement.classList.add("selected");
    linkCompletedElement.classList.remove("selected");
    linkAllElement.classList.remove("selected");
    filterByPending();
  });
  linkCompletedElement.addEventListener("click", () => {
    linkPendingElement.classList.remove("selected");
    linkCompletedElement.classList.add("selected");
    linkAllElement.classList.remove("selected");
    filterByCompleted();
  });
  linkAllElement.addEventListener("click", () => {
    linkPendingElement.classList.remove("selected");
    linkCompletedElement.classList.remove("selected");
    linkAllElement.classList.add("selected");
    filterByAll();
  });
};

const loadHashChangedEvent = () => {
  const event = new Event("click");
  const linkAllElement = document.querySelector(
    "ul.filters > li:nth-child(1) a"
  );
  const linkPendingElement = document.querySelector(
    "ul.filters > li:nth-child(2) a"
  );
  const linkCompletedElement = document.querySelector(
    "ul.filters > li:nth-child(3) a"
  );

  let pageload = {
    ignorehashchange: false,
    loadUrl: function () {
      if (pageload.ignorehashchange == false) {
        //code to parse window.location.hash and load content
        const hash = window.location.hash;
        switch (hash) {
          case "#/":
            linkAllElement.dispatchEvent(event);
            break;
          case "#/pending":
            linkPendingElement.dispatchEvent(event);
            break;
          case "#/completed":
            linkCompletedElement.dispatchEvent(event);
            break;
          default:
            linkAllElement.dispatchEvent(event);
        }
      }
    },
  };

  window.addEventListener("hashchange", pageload.loadUrl, false);
};

listTodos();

existTodos();

hideMainAndFooter();

loadFormNewTodoEvent();

loadClearCompletedEvent();

loadFilterButtons();

loadHashChangedEvent();
