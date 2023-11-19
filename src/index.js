import "./css/base.css";
import { fetch, add, edit, toggleComplete, remove } from "./js/storage";

function getRoute() {
  let re = /(?<=#)\/.*$/g;
  let url = window.location.hash
  let route;
  if(window.location.hash === '') route = '/';
  else route = url.slice(re.exec(url).index, url.length);

  return route;
}

function render(todos) {

  if(todos.some((todo)=>todo.completed)) document.querySelector('.clear-completed').style.display = 'block';
  else document.querySelector('.clear-completed').style.display = 'none';
  
  if(todos.length === 0) {
    document.querySelector('.main').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
    return;
  } else {
    document.querySelector('.main').style.display = 'block';
    document.querySelector('.footer').style.display = 'block';
  }

  let list = document.querySelector('.todo-list');
  let route = getRoute();

  while(list.hasChildNodes()) list.removeChild(list.lastChild);
  
  updateCounter(todos.filter((todo)=>!todo.completed).length);
  
  if(route === '/') {
    document.querySelector("a[href='#/pending']").classList.remove('selected');
    document.querySelector("a[href='#/']").classList.add('selected');
    document.querySelector("a[href='#/completed']").classList.remove('selected');
  }
  else if(route === '/pending') {
    todos = todos.filter((todo)=>!todo.completed);
    document.querySelector("a[href='#/pending']").classList.add('selected');
    document.querySelector("a[href='#/']").classList.remove('selected');
    document.querySelector("a[href='#/completed']").classList.remove('selected');
  }
  else if(route === '/completed') {
    todos = todos.filter((todo)=>todo.completed);
    document.querySelector("a[href='#/pending']").classList.remove('selected');
    document.querySelector("a[href='#/']").classList.remove('selected');
    document.querySelector("a[href='#/completed']").classList.add('selected');
  }


  todos.forEach((todo)=>{
    let liTodo = document.createElement("li");
    let view = document.createElement("div");
    let completeButton = document.createElement("input");
    let title = document.createElement("label"); 
    let destroyButton = document.createElement("button");
    let editInput = document.createElement("input");
  
    completeButton.type = "checkbox";
    completeButton.classList.add("toggle");
  
    title.innerText = todo.title;
  
    if(todo.completed) {
      liTodo.classList.add("completed");
      completeButton.checked = true;
    };
  
    destroyButton.classList.add("destroy");
  
    editInput.classList.add("edit");
  
    view.classList.add("view");
  
    view.append(completeButton, title, destroyButton);
    liTodo.append(view, editInput);
  
  
    completeButton.addEventListener("click", ()=> toggleComplete(localStorageKey, todo.id));
  
    destroyButton.addEventListener("click", ()=> remove(localStorageKey, todo.id));
  
    editInput.addEventListener("keydown", (e)=>{
      if(e.key === "Enter") {
        if(e.target.value.trim() !== "") edit(localStorageKey, todo.id, e.target.value.trim());
      }
      else if(e.key === "Escape") {
        editInput.style.display = "none";
        liTodo.classList.remove("editing");
      }
    });

    title.addEventListener("dblclick", ()=>{
      editInput.style.display = "block";
      editInput.value = title.innerText;
      editInput.focus();
      liTodo.classList.add("editing");
    });
  
    list.appendChild(liTodo);
    
  });
}

function updateCounter(count) {
  let todoCount = document.querySelector(".todo-count");

  if(count === 1) todoCount.innerHTML = `<strong>${count}</strong> item left`;
  else todoCount.innerHTML = `<strong>${count}</strong> items left`;
}

function main() {
  let todos = fetch(localStorageKey);
  let createTodoInput = document.querySelector(".new-todo");

  render(todos);
  
  createTodoInput.addEventListener("keydown", (e)=>{
    if(e.key === "Enter") {
        if(e.target.value.trim() !== "") { 
          let id;
          todos = fetch(localStorageKey);
          id = todos.length > 0 ? todos[todos.length-1].id + 1 : 0;
          add(localStorageKey, {id, title: e.target.value.trim(), completed: false });
          e.target.value = '';
        }
    }
  });

  window.addEventListener("storage", () => {
    todos = fetch(localStorageKey);
    render(todos);
  });


  window.addEventListener('hashchange', (e)=>{
    todos = fetch(localStorageKey);
    render(todos);
  });

  document.querySelector('.clear-completed').addEventListener('click', ()=>{
    todos = fetch(localStorageKey);
    todos.forEach(todo=>{
      if(todo.completed) remove(localStorageKey, todo.id);
    })
  });
}

const localStorageKey = "mydayapp-js";


main();