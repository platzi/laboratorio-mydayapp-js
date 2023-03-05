export const todoContainer = document.querySelector("ul.todo-list");
export const mainContainer = document.querySelector(".main");
export const footerContainer = document.querySelector(".footer");
export let todos = [];

// To know how many task we have

export const checkTaskNumber = () => {
  const taskCount = todoContainer.childElementCount;
  console.log(taskCount);
  if (taskCount == 0) {
    mainContainer.classList.add("hidden");
    footerContainer.classList.add("hidden");
  } else {
    mainContainer.classList.remove("hidden");
    footerContainer.classList.remove("hidden");
  }
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
  const todoDeleteIcon = document.querySelector(`#todo-${todo.id} div button`);
  todoDeleteIcon.addEventListener("click", () => deleteTodo(todo.id));
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
