// this file manages the main logic of the app or, in other words, any addition of new tasks, as well as
// any modification or deletion each one has

// imports section
import "./css/base.css";
import { newTaskInput, taskListContainer, main, footer, counter, clearCompletedButton, filterElements } from "./js/domElements";
import { loadPage } from "./js/router";

// this will be the main array that manages all of the tasks
let taskList;

// localStorage logic
// |-------------------------------------------------------------|
if (!localStorage.getItem('mydayapp-js')) {
  localStorage.setItem('mydayapp-js', JSON.stringify([]));
  taskList = JSON.parse(localStorage.getItem('mydayapp-js'));
} else {
  taskList = JSON.parse(localStorage.getItem('mydayapp-js'));
}

const updateStoragedTasks = (array) => {
  localStorage.setItem('mydayapp-js', JSON.stringify(array));
  taskList = JSON.parse(localStorage.getItem('mydayapp-js'));
}
// |-------------------------------------------------------------|

// this function will render the list of tasks when: a new task is added, a task is deleted, a task
// is edited and the list is filtered.
const renderNewList = (array) => {

  taskListContainer.replaceChildren('');
  updateStoragedTasks(array);

  array.forEach(item => {
    if(item.visible) {
      const taskContainer = document.createElement('li');
      
      const taskDivContainer = document.createElement('div');
      taskDivContainer.classList.add('view');
      
      const checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.classList.add('toggle');
      
      checkBox.addEventListener('change', () => toggleCompletedState(checkBox, taskContainer, item.id));
      
      if(item.completed) {
        taskContainer.classList.add('completed');
        checkBox.checked = true;
      }
  
      const taskLabel = document.createElement('label');
      taskLabel.textContent = item.title;

      taskLabel.addEventListener('dblclick', () => openTaskEditor(editTaskLabel, taskContainer));
  
      const deleteTaskButton = document.createElement('button');
      deleteTaskButton.type = 'button';
      deleteTaskButton.classList.add('destroy');
      
      deleteTaskButton.addEventListener('click', () => eliminateTask(item.id));
      
      taskDivContainer.append(checkBox, taskLabel, deleteTaskButton);
      
      const editTaskLabel = document.createElement('input');
      editTaskLabel.type = 'text';
      editTaskLabel.classList.add('edit');
      editTaskLabel.value = item.title;
      
      editTaskLabel.addEventListener('keydown', e => editTask(e, item.id, taskContainer));
      
      taskContainer.append(taskDivContainer, editTaskLabel);
    
      taskListContainer.append(taskContainer);
    }
  });

  updateCounter(array);
  toggleClearCompletedButton();
}

// this is the text input that receives the text given to the input
// and creates a new task. A task is an object that consists of four properties:
// id: string; title: string; completed: boolean; visible: boolean;
newTaskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.value.length > 1 && e.target.value.trim()){
    const newTask = {
      id: e.target.value.trim(),
      title: e.target.value.trim(),
      completed: false,
      visible: true
    }
    taskList.push(newTask);
    renderNewList(taskList);
    hideMainAndFooterToggle();
    e.target.value = '';
  }
});

// this function manages the visual and logic state of a task whenever its completed state changes
// whenever the user checks or unchecks it, also updating the pending task's counter
const toggleCompletedState = (checkedElement, elementToChange, elementId) => {
  const elementIndex = taskList.findIndex(item => item.id === elementId);

  if (checkedElement.checked) {
    taskList[elementIndex].completed = true;
    elementToChange.classList.add('completed');
    updateStoragedTasks(taskList);
  } else {
    taskList[elementIndex].completed = false;
    elementToChange.classList.remove('completed');
    updateStoragedTasks(taskList);
  }

  updateCounter(taskList);
  toggleClearCompletedButton();
}

// this function is responsible for the elimination of an specific task whenever the user clicks
// the X icon
const eliminateTask = (elementId) => {
  taskList.splice(taskList.findIndex(item => item.id === elementId), 1);
  renderNewList(taskList);
  hideMainAndFooterToggle();
}

// this function opens the task editor whenever the user double-clicks a task
const openTaskEditor = (elementToFocus, elementToChange) => {
  elementToChange.classList.add('editing');
  elementToFocus.focus();
  toggleHiddenContent(true);
}

// this function actives whenever a task is going to be edited, hidding all other tasks in the list
// and only showing the one being edited
const toggleHiddenContent = addHidden => {
  taskList.forEach(() => {
    const tasksToHide = [...taskListContainer.children];
    if(addHidden) {
      tasksToHide.forEach(item => {
        if(!item.classList.contains('editing')) {
          item.classList.add('hidden');
        }
      })
    } else {
      tasksToHide.forEach(item => {
        item.classList.remove('hidden');
      })
    }
  })
}

// this function manages all the task editing logic, where it receives new text in a text input and,
// if the user presses enter, the task gets update and, if escape is pressed, the task editor closes,
// canceling any input the user entered and showing the default task.
// Either if the user presses enter or escape, the rest of the tasks will be shown.
const editTask = (e, elementId, elementToChange) => {
  const elementIndex = taskList.findIndex(item => item.id === elementId);
  
  if(e.key === 'Enter') {
    taskList[elementIndex].title = e.target.value.trim();
    taskList[elementIndex].id = e.target.value.trim();
    elementToChange.classList.remove('editing');
    renderNewList(taskList);
    toggleHiddenContent(false);
  } else if(e.key === 'Escape') {
    elementToChange.classList.remove('editing');
    e.target.value = taskList[elementIndex].title;
    toggleHiddenContent(false);
  }
}

// this function toggles the visibility of the footer whenever the task list is empty or not
const hideMainAndFooterToggle = () => {
  if(taskList.length < 1) {
    footer.classList.add('hidden');
    main.classList.add('hidden');
  } else {
    footer.classList.remove('hidden');
    main.classList.remove('hidden');
  }
}

// footer functionalities: task counter, delete completed tasks button, filter tasks

// this function updates the counter whenever the task's completion state changes
const updateCounter = (array) => {
  const pendingTasks = array.filter(item => !item.completed);
  counter.innerHTML = `<strong>${pendingTasks.length}</strong> ${pendingTasks.length === 1 ? 'item' : 'items'} left`;
}

// this function manages the "Clear completed" button functionality, where it will delete any completed
// task there is.
const deleteCompletedTasks = (array) => {
  const onlyPendingTasks = array.filter(item => !item.completed);
  renderNewList(onlyPendingTasks);

  if(onlyPendingTasks.length < 1) {
    hideMainAndFooterToggle();
  }
}

clearCompletedButton.addEventListener('click', () => deleteCompletedTasks(taskList));

// this function manages the visibility of the "Clear completed" button, where it defaults to 'hidden'
// if there's no completed task and 'visible' otherwise
const toggleClearCompletedButton = () => {
  if (taskList.some(item => item.completed)) {
    clearCompletedButton.classList.remove('hidden');
  } else {
    clearCompletedButton.classList.add('hidden');
  }
}

// this array contains all anchor elements which will be used in routes.js
const filterElementsArr = [...filterElements];

// here, all anchor elements receive a 'click' event to update the navigator's URL, saving it's current
// state while also preventing page reloading
filterElementsArr.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.pushState({path: item.hash}, '', item.hash);
    loadPage(item.hash);
  });
});

hideMainAndFooterToggle();

export { filterElementsArr, renderNewList, taskList };