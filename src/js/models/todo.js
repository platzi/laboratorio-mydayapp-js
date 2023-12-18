import * as storage from './storage.js';

export const ALL_FILTER = '#/all';
export const COMPLETED_FILTER = '#/completed';
export const PENDINGLFILTER = '#/pending';

export class ToDos {
  constructor() {
    this.toDos = [];
    this.filter = '';
    this.filteredToDos = [];
  }

  loadAll() {
    this.toDos = storage.readAllToDos();
  }

  addTodo({title}) {
    this.toDos.push(new ToDo(title));
    storage.writeAllToDos(this.toDos);
  }
}

class ToDo {
  constructor(title, completed = false) {
    const timestamp = new Date().getTime();
    const firstRandomPart = Math.floor(Math.random() * 100);
    const secondRandomPart = Math.floor(Math.random() * 100);

    this.id = `${firstRandomPart}${timestamp}${secondRandomPart}`;
    this.title = title;
    this.completed = completed;
  }

  markAsCompleted() {
    this.completed = true;
  }

  markAsIncomplete() {
    this.completed = false;
  }
}