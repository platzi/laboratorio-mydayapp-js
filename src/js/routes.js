import * as controller from "./controller";
import {
  ALL_FILTER,
  COMPLETED_FILTER,
  PENDING_FILTER,
} from "./models/toDosCollection";

const KNOWN_HASHES = {
  filters: [ALL_FILTER, COMPLETED_FILTER, PENDING_FILTER],
};

export const routeTo = (hash, toDosCollection) => {
  if (hash == "" || KNOWN_HASHES.filters.includes(hash)) {
    controller.index(hash, toDosCollection);

    return;
  }

  return (window.location.href = "/");
};

export const handleHashChange = (toDosCollection) => {
  const newHash = new URL(document.URL).hash;
  routeTo(newHash, toDosCollection);
};

export const removeAllCompletedTodos = (toDosCollection) => {
  controller.destroyCompleted(toDosCollection);
};

export const createTodo = (title, toDosCollection) => {
  controller.create(title, toDosCollection);
};
