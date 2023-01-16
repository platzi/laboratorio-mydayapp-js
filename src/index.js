import "./css/base.css";

import { newTodoInput, todoListContainer } from "./js/domElements";

// testing list
const todoList = [
  { id: 'Una tarea', title: 'Una tarea', completed: false },
  { id: 'Otra tarea', title: 'Otra tarea', completed: false },
  { id: 'Una tarea completada', title: 'Una tarea completada', completed: true },
];

const renderNewList = (array) => {

  todoListContainer.replaceChildren('');

  array.forEach(item => {
    const todoContainer = document.createElement('li');
    todoContainer.classList.add('todo-container');
    
    const todoDivContainer = document.createElement('div');
    todoDivContainer.classList.add('view');
    
    const checkBox = document.createElement('input');
    checkBox.classList.add('toggle');
    checkBox.type = 'checkbox';
    checkBox.addEventListener('change', () => toggleCompletedState(checkBox, todoContainer, item.id));
    
    if(item.completed) {
      todoContainer.classList.add('completed');
      checkBox.checked = true;
    }

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
    
    todoLabel.addEventListener('dblclick', () => openTaskEditor(editTodoLabel, todoContainer));

    editTodoLabel.addEventListener('keydown', e => editTask(e, item.id, todoContainer));
    
    todoContainer.append(todoDivContainer, editTodoLabel);
  
    todoListContainer.append(todoContainer);
  });
}

renderNewList(todoList);

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

const toggleHiddenContent = addHidden => {
  todoList.forEach(() => {
    const nodeList = document.getElementsByClassName('todo-container');
    if(addHidden) {
      [...nodeList].forEach(item => {
        if(!item.classList.contains('editing')) {
          item.classList.add('hidden');
        }
      })
    } else {
      [...nodeList].forEach(item => {
        item.classList.remove('hidden');
      })
    }
  })
}

const openTaskEditor = (elementToFocus, elementToChange) => {
  elementToChange.classList.add('editing');
  elementToFocus.focus();
  toggleHiddenContent(true);
}

const editTask = (e, elementId, elementToChange) => {
  const elementIndex = todoList.findIndex(item => item.id === elementId);
  
  if(e.key === 'Enter') {
    todoList[elementIndex].title = e.target.value.trim();
    todoList[elementIndex].id = e.target.value.trim();
    elementToChange.classList.remove('editing');
    renderNewList(todoList);
    toggleHiddenContent(false);
  } else if(e.key === 'Escape') {
    elementToChange.classList.remove('editing');
    e.target.value = todoList[elementIndex].title;
    toggleHiddenContent(false);
  }
}

newTodoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.value.length > 1 && e.target.value.trim()){
    const newTodo = {
      id: e.target.value.trim(),
      title: e.target.value.trim(),
      completed: false
    }
    addNewTask(newTodo);
    e.target.value = '';
  }
});
