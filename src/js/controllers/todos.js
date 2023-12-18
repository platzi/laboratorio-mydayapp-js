import * as view from '../views/todoList';
import { COMPLETED_FILTER } from '../models/todo'

export const index = (filter, toDos) => {
  toDos.loadAll();
  toDos.filterBy(filter);

  view.renderNewList(toDos);
}

export const create = (title, toDos) => {
  const toDo = toDos.addTodo(title);
  console.log(toDos)
  if (toDos.filter === COMPLETED_FILTER) return;

  view.renderAppendList(toDo, toDos);
}

export const destroy = (id, toDos) => {
  toDos.destroyById(id);
  view.renderNewList(toDos);
}
