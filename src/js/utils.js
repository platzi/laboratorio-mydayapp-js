const utils = {
  todoInput: document.querySelector('.new-todo'),
  todoContainer: document.querySelector('.todoapp-wrapper'),
  todoList: document.querySelector('.todo-list'),
  todoCount: document.querySelector('.todo-count'),
  buttonClear: document.querySelector('.clear-completed')
};

const isCompletedTask = {
  value: false
};

let tasksCount;
if (localStorage.getItem('counter')){
  tasksCount = JSON.parse(localStorage.getItem('counter'));
} else {
  tasksCount = {
    all: 0,
    pending: 0,
    completed: 0
  };
}

let data;
if (localStorage.getItem('mydayapp-js')){
  data = JSON.parse(localStorage.getItem('mydayapp-js'));
} else {
  data = {};
}

export {utils, tasksCount, isCompletedTask, data}