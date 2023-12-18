import * as listView from "./views/todoList";
import * as containerView from "./views/container";

export const index = (filter, toDos) => {
  toDos.loadAll();
  toDos.filterBy(filter);

  renderNewList(toDos);
};

export const create = (title, toDos) => {
  toDos.addTodo(title);
  renderNewList(toDos);
};

export const destroy = (id, toDos) => {
  toDos.destroyById(id);
  renderNewList(toDos);
};

export const destroyCompleted = (toDos) => {
  toDos.destroyCompleted();
  renderNewList(toDos);
};

export const update = (id, payload, toDos) => {
  toDos.updateById(id, payload);
  renderNewList(toDos);
};

const renderNewList = (toDos) => {
  containerView.renderContent(toDos);
  listView.renderNewList(toDos);
};
