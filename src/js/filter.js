import { TODO } from '../index';

/**
 * Show all tasks.
 */
export function filterAll() {
	/** @type {HTMLUListElement} */
	const TODO_CONTAINER = document.querySelector('.todo-list');

	TODO_CONTAINER.innerHTML = '';
	TODO.init();
}

/**
 * Show only pending tasks.
 */
export function filterPending() {
	/** @type {HTMLUListElement} */
	const TODO_CONTAINER = document.querySelector('.todo-list');

	/** @type {import('./TodoListStore').Task[]}  */
	const TASKS = JSON.parse(localStorage.getItem('mydayapp-js'));
	const PENDING_TASKS = TASKS.filter((task) => !task.completed);
	const TASK_HTML = PENDING_TASKS.map((task) => TODO.templateTask(task));

	TODO_CONTAINER.innerHTML = '';
	TODO_CONTAINER.append(...TASK_HTML);
}

/**
 * Show only completed tasks.
 */
export function filterCompleted() {
	/** @type {HTMLUListElement} */
	const TODO_CONTAINER = document.querySelector('.todo-list');

	/** @type {import('./TodoListStore').Task[]}  */
	const TASKS = JSON.parse(localStorage.getItem('mydayapp-js'));
	const COMPLETED_TASKS = TASKS.filter((task) => task.completed);
	const TASK_HTML = COMPLETED_TASKS.map((task) => TODO.templateTask(task));

	TODO_CONTAINER.innerHTML = '';
	TODO_CONTAINER.append(...TASK_HTML);
}

/**
 * Mark anchor filter selected.
 * @param {HTMLAnchorElement} target Anchor filter clicked.
 */
export function highlightFilter(target) {
	/** @type {HTMLUListElement} */
	const FILTERS_CONTAINER = document.querySelector('.filters');

	/** @type {HTMLAnchorElement[]} */
	const FILTERS = Array.from(FILTERS_CONTAINER.querySelectorAll('a'));

	for (const filter of FILTERS) {
		if (filter.innerText === target.innerText) {
			filter.classList.add('selected');
		} else {
			filter.classList.remove('selected');
		}
	}
}
