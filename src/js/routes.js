import { filterElementsArr, renderNewList, todoList } from "../index";

const filtersClassFunction = (path) => {
  filterElementsArr.find(item => {
    if(item.hash === path) {
      item.classList.add('selected');
    } else {
      item.classList.remove('selected');
    }
  });
}

const renderCompletedTasks = (path) => {
  todoList.filter(item => {
    item.completed ? item.visible = true : item.visible = false;
    return item.visible;
  });
  filtersClassFunction(path);
  renderNewList(todoList);
}

const renderPendingTasks = (path) => {
  todoList.filter(item => {
    !item.completed ? item.visible = true : item.visible = false;
    return item.visible;
  });
  filtersClassFunction(path);
  renderNewList(todoList);
}

const renderAllTasks = (path) => {
  todoList.filter(item => item.visible = true);
  filtersClassFunction(path);
  renderNewList(todoList);
}

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