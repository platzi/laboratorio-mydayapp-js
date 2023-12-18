import * as storage from './storage.js';

export const ALL_FILTER = '#/all';
export const COMPLETED_FILTER = '#/completed';
export const PENDING_FILTER = '#/pending';

export class ToDos {
  constructor() {
    this.toDos = [];
    this.filter = '';
    this.filteredToDos = [];
  }

  loadAll() {
    this.toDos = storage.readAllToDos();
  }

  filterBy(filter){
    this.filter = filter;

    if (filter === COMPLETED_FILTER){
      this.filteredToDos = this.toDos.filter(todo => todo.completed === true);
      return;
    }

    if (filter === PENDING_FILTER){
      this.filteredToDos = this.toDos.filter(todo => todo.completed === false);
      return;
    }

    this.filter = null;
    this.filteredToDos = this.toDos;
  }

  addTodo(title) {
    const toDo = new ToDo(title)

    this.toDos.push(new ToDo(title));
    storage.writeAllToDos(this.toDos);
    return toDo;
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