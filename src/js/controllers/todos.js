import * as todoList from '../views/todoList';

export const index = (filter, toDos) => {
  toDos.loadAll();
  toDos.filterBy(filter);
  console.log(filter)

  console.log(toDos)
  todoList.renderNewList(toDos.filteredToDos);
}

export const create = (title, toDos) => {
  toDos.addTodo(title);
}
