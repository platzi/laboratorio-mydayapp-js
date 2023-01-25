// this file contains the routes logic and paths that the browser must load whenever the user
// interacts with the filters in the footer

import { filterElementsArr, renderNewList, taskList } from "../index";

// this toggles the filters 'selected' stated whenever they are clicked
const filtersClassFunction = (path) => {
  filterElementsArr.find(item => {
    if(item.hash === path) {
      item.classList.add('selected');
    } else {
      item.classList.remove('selected');
    }
  });
}

// this function renders only the completed tasks whenever the user filters them
const renderCompletedTasks = (path) => {
  taskList.filter(item => {
    item.completed ? item.visible = true : item.visible = false;
    return item.visible;
  });
  filtersClassFunction(path);
  renderNewList(taskList);
}

// this function renders only the pending tasks whenever the user filters them
const renderPendingTasks = (path) => {
  taskList.filter(item => {
    !item.completed ? item.visible = true : item.visible = false;
    return item.visible;
  });
  filtersClassFunction(path);
  renderNewList(taskList);
}

// this function renders all the tasks (completed and pending) whenever the user filters them
const renderAllTasks = (path) => {
  taskList.filter(item => item.visible = true);
  filtersClassFunction(path);
  renderNewList(taskList);
}

// this array tells the browser which template to render depending on the URL's hash
export const routes = [
  {
    path: '#/',
    template: () => renderAllTasks('#/')
  },
  {
    path: '#/pending',
    template: () => renderPendingTasks('#/pending')
  },
  {
    path: '#/completed',
    template: () => renderCompletedTasks('#/completed')
  }
];