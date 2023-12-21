import * as storage from "../storage.js";
import { ToDo } from "./toDo.js";

export const ALL_FILTER = "#/all";
export const COMPLETED_FILTER = "#/completed";
export const PENDING_FILTER = "#/pending";

export class ToDosCollection {
  constructor() {
    this.toDos = [];
    this.filter = "";
    this.filteredToDos = [];
  }

  loadAll() {
    const storedToDos = storage.readAllToDos();
    this.toDos = storedToDos.map(
      (storedToDo) =>
        new ToDo(storedToDo.title, storedToDo.id, storedToDo.completed)
    );
  }

  filterBy(filter) {
    this.filter = filter;

    if (filter === COMPLETED_FILTER) {
      this.filteredToDos = this.toDos.filter((toDo) => toDo.completed === true);
      return;
    }

    if (filter === PENDING_FILTER) {
      this.filteredToDos = this.toDos.filter(
        (toDo) => toDo.completed === false
      );
      return;
    }

    this.filter = ALL_FILTER;
    this.filteredToDos = this.toDos;
  }

  destroyById(id) {
    this.toDos = this.toDos.filter((toDo) => toDo.id !== id);
    storage.writeAllToDos(this.toDos);

    this.filterBy(this.filter);
  }

  destroyCompleted() {
    this.toDos = this.toDos.filter((toDo) => toDo.completed === false);
    storage.writeAllToDos(this.toDos);

    this.filterBy(this.filter);
  }

  updateById(id, payload) {
    this.toDos = this.toDos.map((toDo) => {
      if (toDo.id === id) toDo.update(payload);
      return toDo;
    });
    storage.writeAllToDos(this.toDos);

    this.filterBy(this.filter);
  }

  addTodo(title) {
    const toDo = new ToDo(title);

    this.toDos.push(new ToDo(title));
    this.filterBy(this.filter);
    storage.writeAllToDos(this.toDos);
    return toDo;
  }

  countPending() {
    return this.toDos.filter((toDo) => toDo.completed === false).length;
  }

  countCompleted() {
    return this.toDos.length - this.countPending();
  }
}
