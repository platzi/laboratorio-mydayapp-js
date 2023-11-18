import "./css/base.css";
import { fetchTodos, addTodo, editTodo, toggleCompleteTodo, deleteTodo } from "./js/utils";

function renderTodo(todo, counter) {
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

  document.querySelector(".todo-list").append(li_todo);

  todo_input.addEventListener("click", ()=>{
    li_todo.classList.toggle("completed");
    toggleCompleteTodo(API, todo.id);
  });

  todo_button.addEventListener("click", async ()=>{
    await deleteTodo(API, todo.id);
    document.querySelector(".todo-list").removeChild(li_todo);
    updateCounter(-1, counter);
  });

  todo_label.addEventListener("click", ()=>{
    edit_todo_input.style.display = "block";
    edit_todo_input.value = todo_label.innerText;
    edit_todo_input.focus();
    li_todo.classList.add("editing");
  });

  edit_todo_input.addEventListener("keydown", (e)=>{
    if(e.key === "Enter") {
      if(e.target.value.trim() !== "") {
        todo_label.innerText = e.target.value.trim();
        edit_todo_input.style.display = "none";
        editTodo(API, todo.id, e.target.value.trim());
        li_todo.classList.remove("editing");
    };
    }
    else if(e.key === "Escape") {
      edit_todo_input.style.display = "none";
      li_todo.classList.remove("editing");
    }
  })
}

async function createNewTodo(e, todos) {
  if(e.target.value.trim() !== ""){
    let id = todos.length > 0 ? todos[todos.length-1].id + 1 : 0;

    let todo = {
      id, 
      title:e.target.value.trim(), 
      completed: false
    };

    renderTodo(todo);
    await addTodo(API, todo);
    e.target.value = "";
  }
}

function updateCounter(num) {
  counter += num;
  if(counter >= 1) document.querySelector(".todo-count").innerText = `${counter} item left`;
  else document.querySelector(".todo-count").innerText = `${counter} items left`
}

async function main() {
  let todos = await fetchTodos(API);
  counter = todos.length;

  todos.forEach(todo => {
    renderTodo(todo);
  });

  document.querySelector(".new-todo").addEventListener("keydown", async (e)=>{
    if(e.key === 'Enter'){
      await createNewTodo(e, todos);
      updateCounter(1);
    }
  });
  updateCounter(0)
}

const API = "mydayapp-js";
let counter;

main();