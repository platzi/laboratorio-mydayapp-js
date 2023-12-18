import * as controller from '../controllers/todos';
import { ALL_FILTER, COMPLETED_FILTER, PENDING_FILTER } from '../models/todo';

const KNOWN_HASHES = { filters: [ALL_FILTER, COMPLETED_FILTER, PENDING_FILTER] }

export const routeTo = (hash, toDos) => {
  if (hash == '' || KNOWN_HASHES.filters.includes(hash)){
    controller.index(hash, toDos);

    return;
  }

  return window.location.href = '/'
}

export const listenHashChange = (toDos) => {
  const newHash = new URL(document.URL).hash
  routeTo(newHash, toDos)
}

export const createTodo = (title, toDos) => {
  controller.create(title, toDos);
}