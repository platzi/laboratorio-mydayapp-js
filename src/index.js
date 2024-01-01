import './css/base.css';
import './js/listeners';

import { TodoList } from './js/TodoList';
import { TodoListStore } from './js/TodoListStore';

export const TODO_STORE = new TodoListStore();

export const TODO = new TodoList();

TODO.hiddenShowMainAndFooter();
// globalThis.localStorage.removeItem('mydayapp-js');
