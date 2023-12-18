import { listenHashChange } from "./routes/todos";

const INPUT_TODO_TEXT_BOX = "new_todo_description";

export const addEventToToDoInput = (toDos) => {
  const todoInput = document.getElementById(INPUT_TODO_TEXT_BOX);
  if(!todoInput) return;

  todoInput.addEventListener('keydown', (event) => handleNewToDoInput(event, toDos));
}

export const addHashListenerToDocument = (ToDos) => {
  window.addEventListener('hashchange', () => listenHashChange(ToDos));
}

const handleNewToDoInput = (event, toDos) => {
  const title = event.target.value;
  if (event.key != 'Enter') return;
  if (title == '') return;
  
  toDos.addTodo(title);
  console.log(title);
}