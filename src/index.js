import "./css/base.css";

async function fetchTodos(API) {
  let todos = localStorage.getItem(API);
  if(todos !== null) {
    return JSON.parse(todos);
  }
  localStorage.setItem(API, '[]');
  return [];
}

async function addTodo(API, todo) {
  let todos = localStorage.getItem(API);
  todos = JSON.parse(todos);
  todos.push(todo);
  localStorage.setItem(API, JSON.stringify(todos));
}

async function deleteTodo(API, todoid) {
  let todos = localStorage.getItem(API);
  todos = JSON.parse(todos);
  let todoIndex = todos.findIndex((todo)=>todo.id == todoid);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    localStorage.setItem(API, JSON.stringify(todos));
  }
}

async function toggleCompleteTodo(API, todoid) {
  let todos = localStorage.getItem(API);
  todos = JSON.parse(todos);
  let todoIndex = todos.findIndex((todo)=>todo.id === todoid);
  if (todoIndex !== -1) {
    todos[todoIndex].completed = !todos[todoIndex].completed
    localStorage.setItem(API, JSON.stringify(todos));
  }
}

function renderTodo(todo) {
  let li_todo = document.createElement('li');
  let todo_view = document.createElement('div');
  let todo_input = document.createElement('input');
  let todo_label = document.createElement('label');
  let todo_button = document.createElement('button');

  todo_input.type = 'checkbox';
  todo_input.classList.add('toggle');

  todo_label.innerText = todo.title;

  if(todo.completed) {
    li_todo.classList.add('completed');
    todo_input.checked = true;
  };

  todo_button.classList.add('destroy');

  todo_view.append(todo_input, todo_label, todo_button);
  li_todo.append(todo_view);

  document.querySelector('.todo-list').append(li_todo);

  todo_input.addEventListener('click', ()=>{
    li_todo.classList.toggle('completed');
    toggleCompleteTodo(API, todo.id);
  });

  todo_button.addEventListener('click', ()=>{
    document.querySelector('.todo-list').removeChild(li_todo);
    deleteTodo(API, todo.id);
  })
}

async function main() {
  let todos = await fetchTodos(API);

  todos.forEach(todo => {
    renderTodo(todo);
  });

  document.querySelector('.new-todo').addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
      if(e.target.value.trim() !== ''){
        let todo = {id:todos[todos.length-1].id + 1, title:e.target.value, completed: false};
        renderTodo(todo);
        addTodo(API, todo);
        e.target.value = '';
      }
    }
  });

  console.log();
}

const API = 'mydayapp-js';

main();