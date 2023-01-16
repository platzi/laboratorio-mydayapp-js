import "./css/base.css";

import { newTodoInput, todoListContainer } from "./js/domElements";

// testing list
const todoList = [
  { id: 'Una tarea', title: 'Una tarea', completed: false },
  { id: 'Otra tarea', title: 'Otra tarea', completed: false },
  { id: 'Una tarea completada', title: 'Una tarea completada', completed: true },
];

const newTodoList = [];

const renderNewList = (array) => {

  todoListContainer.replaceChildren('');

  array.forEach(item => {
    const todoContainer = document.createElement('li');
    
    const todoDivContainer = document.createElement('div');
    todoDivContainer.classList.add('view');
    
    const checkBox = document.createElement('input');
    checkBox.classList.add('toggle');
    checkBox.type = 'checkbox';
    
    if(item.completed) {
      todoContainer.classList.add('completed');
      checkBox.checked = true;
    }

    checkBox.addEventListener('change', () => toggleCompletedState(checkBox, todoContainer, item.id));
  
    const todoLabel = document.createElement('label');
    todoLabel.innerHTML = item.title;
  
    const deleteTodoButton = document.createElement('button');
    deleteTodoButton.type = 'button';
    deleteTodoButton.classList.add('destroy');

    deleteTodoButton.addEventListener('click', () => eliminateTask(item.id));
  
    todoDivContainer.append(checkBox, todoLabel, deleteTodoButton);
  
    const editTodoLabel = document.createElement('input');
    editTodoLabel.type = 'text';
    editTodoLabel.classList.add('edit');
    editTodoLabel.value = item.title;
  
    todoContainer.append(todoDivContainer, editTodoLabel)
  
    todoListContainer.append(todoContainer);
  });
}

renderNewList(todoList);

const getInputValue = (input) => {
  return input.target.value;
}

const toggleCompletedState = (checkedElement, elementToChange, elementId) => {
  const elementIndex = todoList.findIndex(item => item.id === elementId);

  if (checkedElement.checked) {
    todoList[elementIndex].completed = true;
    elementToChange.classList.add('completed');
  } else {
    todoList[elementIndex].completed = false;
    elementToChange.classList.remove('completed');
  }
}

const eliminateTask = (elementId) => {
  todoList.splice(todoList.findIndex(item => item.id === elementId), 1);
  renderNewList(todoList);
}

const addNewTask = (newTask) => {
  todoList.push(newTask);
  renderNewList(todoList);
}

newTodoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.value.length > 1 && e.target.value.trim()){
    const newTodo = {
      id: getInputValue(e).trim(),
      title: getInputValue(e).trim(),
      completed: false
    }
    addNewTask(newTodo);
    e.target.value = '';
  }
});
