import "./css/base.css";
import { fetch, add, edit, toggleComplete, remove } from "./js/storage";

function render(todos) {

  let list = document.querySelector('.todo-list');
  while(list.hasChildNodes()) {
    list.removeChild(list.lastChild);
  }

  todos.forEach((todo)=>{
    let li_todo = document.createElement("li");
    let todo_view = document.createElement("div");
    let todo_input = document.createElement("input");
    let todo_label = document.createElement("label"); 
    let todo_button = document.createElement("button");
    let edit_todo_input = document.createElement("input");
  
    todo_input.type = "checkbox";
    todo_input.classList.add("toggle");
  
    todo_label.innerText = todo.title;
  
    if(todo.completed) {
      li_todo.classList.add("completed");
      todo_input.checked = true;
    };
  
    todo_button.classList.add("destroy");
  
    edit_todo_input.classList.add("edit");
  
    todo_view.classList.add("view");
  
    todo_view.append(todo_input, todo_label, todo_button);
    li_todo.append(todo_view, edit_todo_input);
  
  
    todo_input.addEventListener("click", ()=>toggleComplete(localStorageKey, todo.id));
  
    todo_button.addEventListener("click", ()=> remove(localStorageKey, todo.id));
  
    edit_todo_input.addEventListener("keydown", (e)=>{
      if(e.key === "Enter") {
        if(e.target.value.trim() !== "") {
          edit(localStorageKey, todo.id, e.target.value.trim());
      };
      }
      else if(e.key === "Escape") {
        edit_todo_input.style.display = "none";
        li_todo.classList.remove("editing");
      }
    });

    todo_label.addEventListener("click", ()=>{
      edit_todo_input.style.display = "block";
      edit_todo_input.value = todo_label.innerText;
      edit_todo_input.focus();
      li_todo.classList.add("editing");
    });
  
    list.appendChild(li_todo);
    
  });
  updateCounter(todos.filter((todo)=>!todo.completed).length);
}

function updateCounter(count) {
  if(count === 1) document.querySelector(".todo-count").innerHTML = `<strong>${count}</strong> item left`;
  else document.querySelector(".todo-count").innerHTML = `<strong>${count}</strong> items left`;
}

function main() {
  let todos = fetch(localStorageKey);
  let createTodoInput = document.querySelector(".new-todo");

  render(todos);

  window.addEventListener("storage", () => {
    todos = fetch(localStorageKey);
    render(todos);
  });

  createTodoInput.addEventListener("keydown", (e)=>{
      if(e.key === "Enter") {
          if(e.target.value.trim() !== "") { 
          let id;
          todos = fetch(localStorageKey);
          id = todos.length > 0 ? todos[todos.length-1].id + 1 : 0;
          add(localStorageKey, {id, title: e.target.value.trim(), completed: false });
        }
      }
    });
}

const localStorageKey = "mydayapp-js";


main();