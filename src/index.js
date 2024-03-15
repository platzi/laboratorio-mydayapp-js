import "./css/base.css";

const listTodos = document.querySelector('.todo-list');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const newTodo = document.querySelector('.new-todo');
const clearCompletedButton = document.querySelector('.clear-completed');

newTodo.addEventListener("change", (e) => handleNewTodo(e))
clearCompletedButton.addEventListener("click", () => clearCompleted())
window.addEventListener("load", (e) => reloadPage())

function getTodos(filter) {
  const todos = JSON.parse(localStorage.getItem('mydayapp-js')) || [];
  const listAll = document.querySelector('.filters li #all');
  const listPending = document.querySelector('.filters li #pending');
  const listCompleted = document.querySelector('.filters li #completed');
  switch (filter) {
    case '':
      listAll.classList.add('selected');
      listPending.classList.remove('selected');
      listCompleted.classList.remove('selected');
      return todos;
    case 'pending':
      listAll.classList.remove('selected');
      listPending.classList.add('selected');
      listCompleted.classList.remove('selected');
      return todos.filter(todo => !todo.completed);
    case 'completed':
      listAll.classList.remove('selected');
      listPending.classList.remove('selected');
      listCompleted.classList.add('selected');
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}
window.onhashchange = function() {
  const filter = window.location.hash.slice(2); // Remove the '#/' part
  const todos = getTodos(filter);
  renderTodos(todos);
};
function renderTodos(todos) {
  const list = document.querySelector('.todo-list');
  list.innerHTML = ''; // Clear the list
  console.log(todos)
  for (const todo of todos) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `      
    <div class="view">
      <input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""} />
      <label>${todo.title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${todo.title}" />
    `;
    list.appendChild(listItem);
  }
  getTodoList()
};

function reloadPage(){
  getLocalStorage()
  getTodoList()
  todoLeft()
}
function handleNewTodo(event){
  const todo = event.target.value.trim();
  event.target.value = "";
  if(todo === "") return;
  if(todo){
    const todoItem = document.createElement('li');
    todoItem.innerHTML = `
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label>${todo}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${todo}" />
    `
    listTodos.appendChild(todoItem)
    main.removeAttribute("hidden", "")
    footer.removeAttribute("hidden", "")
  }
  getTodoList()
  setLocalStorage()
  todoLeft()
}
function getTodoList(){
  const todoList = document.querySelectorAll('.todo-list li');
  clearCompletedButton.setAttribute("hidden", "")
  todoList.forEach((todo) => {
    const toggle = todo.querySelector('.toggle');
    const destroy = todo.querySelector('.destroy');
    const view = todo.querySelector('.view');
    if(todo.classList.contains('completed')){
      clearCompletedButton.removeAttribute("hidden", "")
    }
    toggle.addEventListener("click", () => handleTodoComplete(toggle, todo))
    destroy.addEventListener("click", () => handleTodoDestroy(todo))
    view.addEventListener("dblclick", () => handleTodoEdit(view, todo))
  })
  return todoList;
}
function handleTodoComplete(toggle, todo){
  if(toggle.checked){
    todo.classList.add('completed')
    toggle.setAttribute('checked', '')
    clearCompletedButton.removeAttribute("hidden", "")
  }else{
    todo.classList.remove('completed')
    toggle.removeAttribute('checked', '')
  }
  
  setLocalStorage()
  todoLeft()
}
function handleTodoDestroy(todo){
  todo.remove()
  if(listTodos.children.length === 0){
    main.setAttribute("hidden", "")
    footer.setAttribute("hidden", "")
  }
  setLocalStorage()
  todoLeft()
}
function handleTodoEdit(view, todo){
  todo.classList.remove('completed')
  todo.classList.add('editing')
  const edit = todo.querySelector('.edit');
  edit.focus()
  edit.addEventListener("keydown", (e) => handleTodoEditComplete(e, view, todo, edit))
}
function handleTodoEditComplete(e, view, todo, edit){
  if(e.key === "Enter"){
    view.querySelector('label').innerText = e.target.value.trim()
    e.target.blur()
    todo.classList.remove('editing')
    setLocalStorage()
  }
  if(e.key === "Escape"){
    e.target.blur()
    edit.value = view.querySelector('label').innerText
    todo.classList.remove('editing')

  }
}
function todoLeft(){
  const todoListCompleted = document.querySelectorAll('.todo-list .completed');
  const todoList = document.querySelectorAll('.todo-list li');
  const todoLeft = todoList.length - todoListCompleted.length;
  if(todoLeft === todoList.length){
    clearCompletedButton.setAttribute("hidden", "")
  }
  const spanTodoLeft = document.createElement('span');
  const spanTodoLeftExist = document.querySelector('.todo-count');
  if(spanTodoLeftExist){
    spanTodoLeftExist.remove()
  }
  spanTodoLeft.className = "todo-count";
  if(todoLeft === 1){
    spanTodoLeft.innerHTML = `<strong>${todoLeft}</strong> item left`;
  }else{
    spanTodoLeft.innerHTML = `<strong>${todoLeft}</strong> items left`;
  }
  footer.appendChild(spanTodoLeft);
  return todoLeft;
}
function clearCompleted(){
  const todoListCompleted = document.querySelectorAll('.todo-list .completed');
  todoListCompleted.forEach((todo) => {
    todo.remove()
  })
  if(listTodos.children.length === 0){
    main.setAttribute("hidden", "")
    footer.setAttribute("hidden", "")
  }
  setLocalStorage()
  todoLeft()
}
function setLocalStorage(){
  const todoListStorage = document.querySelectorAll('.todo-list li');
  const todoListArray = [];
  todoListStorage.forEach((todo) => {
    const todoItem = {
      title: todo.querySelector('label').innerText,
      completed: todo.classList.contains('completed')
    }
    todoListArray.push(todoItem)
  })
  localStorage.setItem('mydayapp-js', JSON.stringify(todoListArray))
}
function getLocalStorage(){
  const todoList = JSON.parse(localStorage.getItem('mydayapp-js'));
  if(todoList){
    todoList.forEach((todo) => {
      const todoItem = document.createElement('li');
      if(todo.completed){
        todoItem.classList.add('completed')
      }
      todoItem.innerHTML = `
      <div class="view">
        <input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""} />
        <label>${todo.title}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${todo.title}" />
      `
      listTodos.appendChild(todoItem)
    })
  }else{
    main.setAttribute("hidden", "")
    footer.setAttribute("hidden", "")
  }
}
