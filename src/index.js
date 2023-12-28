import './css/base.css';
import './js/listeners';

import { TodoList } from './js/TodoList';

/**
 * Check if .todo-list class is empty.
 * @returns {boolean} If there are elements return true.
 */
function isTodoListEmpty() {
	const TODO_CONTAINER = /** @type {HTMLUListElement} */ (
		document.querySelector('.todo-list')
	);

	return TODO_CONTAINER.children.length === 0;
}

/**
 * Hides or shows .main and .footer if there are not or are elements in todo list as appropriate.
 */
export function hiddenShowMainAndFooter() {
	const IS_EMPTY = isTodoListEmpty();
	const MAIN_CONTAINER = /** @type {HTMLElement} */ (
		document.querySelector('.main')
	);
	const FOOTER_CONTAINER = /** @type {HTMLElement} */ (
		document.querySelector('.footer')
	);

	MAIN_CONTAINER.style.display = IS_EMPTY ? 'none' : 'block';
	FOOTER_CONTAINER.style.display = IS_EMPTY ? 'none' : 'block';
}

export const TODO = new TodoList();

hiddenShowMainAndFooter();
