import "./css/base.css";

import { newTodoInput, todoListContainer, main, footer, counter, clearCompletedButton, filterElements } from "./js/domElements";
import { routes } from "./js/routes";
import { Router } from "./js/router";

export let todoList;

if (!localStorage.getItem('mydayapp-js')) {
  localStorage.setItem('mydayapp-js', JSON.stringify([]));
  todoList = JSON.parse(localStorage.getItem('mydayapp-js'));
} else {
  todoList = JSON.parse(localStorage.getItem('mydayapp-js'));
}

const updateStoragedTodos = (arr) => {
  localStorage.setItem('mydayapp-js', JSON.stringify(arr));
  getStoragedTodos();
}

const getStoragedTodos = () => {
  todoList = JSON.parse(localStorage.getItem('mydayapp-js'));
}

export const renderNewList = (array) => {

  todoListContainer.replaceChildren('');
  updateStoragedTodos(array);

  array.forEach(item => {
    if(item.visible) {
      const todoContainer = document.createElement('li');
      
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
    }
  });

  updateCounter(array);
  toggleClearCompletedButton();
}

const toggleCompletedState = (checkedElement, elementToChange, elementId) => {
  const elementIndex = todoList.findIndex(item => item.id === elementId);

  if (checkedElement.checked) {
    todoList[elementIndex].completed = true;
    elementToChange.classList.add('completed');
    updateStoragedTodos(todoList);
  } else {
    todoList[elementIndex].completed = false;
    elementToChange.classList.remove('completed');
    updateStoragedTodos(todoList);
  }

  updateCounter(todoList);
  toggleClearCompletedButton();
}

const eliminateTask = (elementId) => {
  todoList.splice(todoList.findIndex(item => item.id === elementId), 1);
  renderNewList(todoList);
  hideMainAndFooterToggle();
}

const toggleHiddenContent = addHidden => {
  todoList.forEach(() => {
    const nodeList = todoListContainer.children;
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

const addNewTask = (newTask) => {
  todoList.push(newTask);
  renderNewList(todoList);
  hideMainAndFooterToggle();
}

newTodoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.value.length > 1 && e.target.value.trim()){
    const newTodo = {
      id: e.target.value.trim(),
      title: e.target.value.trim(),
      completed: false,
      visible: true
    }
    addNewTask(newTodo);
    e.target.value = '';
  }
});

const hideMainAndFooterToggle = () => {
  if(todoList.length < 1) {
    footer.classList.add('hidden');
    main.classList.add('hidden');
  } else {
    footer.classList.remove('hidden');
    main.classList.remove('hidden');
  }
}

// footer functionalities: todo counter, delete completed tasks button, filter tasks

const updateCounter = (array) => {
  const pendingTasks = array.filter(item => !item.completed);
  counter.innerHTML = `<strong>${pendingTasks.length}</strong> ${pendingTasks.length === 1 ? 'item' : 'items'} left`;
}

const deleteCompletedTasks = (array) => {
  const onlyPendingTasks = array.filter(item => !item.completed);
  console.log(onlyPendingTasks);
  renderNewList(onlyPendingTasks);

  if(onlyPendingTasks.length < 1) {
    hideMainAndFooterToggle();
  }
}

clearCompletedButton.addEventListener('click', () => deleteCompletedTasks(todoList));

const toggleClearCompletedButton = () => {
  if (todoList.some(item => item.completed)) {
    clearCompletedButton.classList.remove('hidden');
  } else {
    clearCompletedButton.classList.add('hidden');
  }
}

// this array contains all anchor elements which will be used in routes.js
export const filterElementsArr = [...filterElements];

// router logic is found in router.js
const router = new Router(routes);

filterElementsArr.forEach(item => {
  item.addEventListener('click', () => router.loadPage(item.hash));
});

hideMainAndFooterToggle();

// renderNewList(todoList);
// console.log(todoList);