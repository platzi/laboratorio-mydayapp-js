import * as listView from "./views/todoList";
import * as containerView from "./views/container";

export const index = (filter, toDosCollection) => {
  toDosCollection.loadAll();
  toDosCollection.filterBy(filter);

  renderNewList(toDosCollection);
};

export const create = (title, toDosCollection) => {
  toDosCollection.addTodo(title);
  renderNewList(toDosCollection);
};

export const destroy = (id, toDosCollection) => {
  toDosCollection.destroyById(id);
  renderNewList(toDosCollection);
};

export const destroyCompleted = (toDosCollection) => {
  toDosCollection.destroyCompleted();
  renderNewList(toDosCollection);
};

export const update = (id, payload, toDosCollection) => {
  toDosCollection.updateById(id, payload);
  renderNewList(toDosCollection);
};

const renderNewList = (toDosCollection) => {
  containerView.renderContent(toDosCollection);
  listView.renderNewList(toDosCollection);
};
