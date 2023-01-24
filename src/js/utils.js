const utils = {
  todoInput: document.querySelector('.new-todo'),
  todoContainer: document.querySelector('.todoapp-wrapper'),
  todoList: document.querySelector('.todo-list'),
  todoCount: document.querySelector('.todo-count'),
  buttonClear: document.querySelector('.clear-completed')
};

const tasksCount = {
  all: 0,
  pending: 0,
  completed: 0
};

let isCompletedTask = {
  value: false
};

export {utils, tasksCount, isCompletedTask}