import './css/base.css';
import './js/listeners';

import { TodoList } from './js/TodoList';

export const TODO = new TodoList();

TODO.hiddenShowMainAndFooter();
