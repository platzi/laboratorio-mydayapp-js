const utils = {
  todoInput: document.querySelector('.new-todo'),
  todoContainer: document.querySelector('.todoapp-wrapper'),
  todoList: document.querySelector('.todo-list'),
  todoCount: document.querySelector('.todo-count'),
  buttonClear: document.querySelector('.clear-completed'),
  filters: {
    all: document.querySelector('.filters li:nth-child(1) a'),
    pending: document.querySelector('.filters li:nth-child(2) a'),
    completed: document.querySelector('.filters li:nth-child(3) a')
  }
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