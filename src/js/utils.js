export const todoContainer = document.querySelector("ul.todo-list");
export const mainContainer = document.querySelector(".main");
export const footerContainer = document.querySelector(".footer");
export let todos = [];

// To know how many task we have

export const checkTaskNumber = () => {
  const taskCount = todoContainer.childElementCount;
  if (taskCount == 0) {
    mainContainer.classList.add("hidden");
    footerContainer.classList.add("hidden");
  } else {
    mainContainer.classList.remove("hidden");
    footerContainer.classList.remove("hidden");
  }
  const todoCounterSpan = document.querySelector("strong");
  todoCounterSpan.innerText = taskCount;
};

// To add new Task to DOM

export const renderTodo = (todo) => {
  const todoHTML = `<li ${
    todo.completed ? 'class = "completed"' : ""
  } id="todo-${todo.id}">
                      <div class="view">
                        <input class="toggle" type="checkbox" ${
                          todo.completed ? "checked" : ""
                        }/>
                        <label>${todo.title}</label>
                        <button class="destroy"></button>
                      </div>
                      <input class="edit" value="${todo.title}" />
                    </li>`;
  todoContainer.insertAdjacentHTML("beforeend", todoHTML);

  const todoItem = document.querySelector(`#todo-${todo.id}`);

  const todoDeleteIcon = todoItem.querySelector(`div button`);
  const checkInput = todoItem.querySelector(`div input`);
  const todoLabel = todoItem.querySelector(`div label`);

  todoDeleteIcon.addEventListener("click", () => deleteTodo(todo.id));
  checkInput.addEventListener("change", () => completeTodo(todo.id));
  todoLabel.addEventListener("dblclick", () => editTodo(todo.id));
};

// Load task from localStorage

export const loadTodos = () => {
  todoContainer.innerHTML = "";
  todos = JSON.parse(localStorage.getItem("todos"));
  if (todos) {
    todos.forEach((todo) => {
      renderTodo(todo);
    });
  }
};

export const saveTodo = (todo) => {
  if (!todos) {
    todos = [];
  }
  todos.push(todo);
  console.log(JSON.stringify(todos));
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodo(todo);
};

export const deleteTodo = (id) => {
  todos = todos.filter((el) => el.id != id);
  console.log(JSON.stringify(todos));
  localStorage.setItem("todos", JSON.stringify(todos));
  loadTodos();
};

export const completeTodo = (id) => {
  const todoToUpdate = todos.find((todo) => {
    return todo.id == id;
  });
  todoToUpdate.completed = !todoToUpdate.completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  loadTodos();
};

export const editTodo = (id) => {
  const todoItem = document.querySelector(`#todo-${id}`);
  todoItem.classList.add("editing");
  const todoInput = todoItem.querySelector("input.edit");
  console.log(todoInput);
  todoInput.focus();
  todoInput.setSelectionRange(todoInput.value.length, todoInput.value.length);
  todoInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      const value = todoInput.value;
      saveNewValue(id, value);
      loadTodos();
    }
  });
};

export const saveNewValue = (id, value) => {
  const todoToUpdate = todos.find((todo) => todo.id == id);
  todoToUpdate.title = value;
  localStorage.setItem("todos", JSON.stringify(todos));
};
