import './css/base.css';

import { Keys } from './js/types';

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
 * @returns {void}
 */
function hiddenShowMainAndFooter() {
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

/**
 * The TodoList class is responsible for managing the todo list.
 * @public
 * @class
 */
class TodoList {
	#todoList = /** @type {HTMLUListElement} */ (
		document.querySelector('.todo-list')
	);

	/** @type {HTMLInputElement} */
	#newTaskInput = /** @type {HTMLInputElement} */ (
		document.querySelector('.new-todo')
	);

	constructor() {}

	/** @public */
	addNewTask() {
		const INPUT_VALUE = this.#newTaskInput.value;

		if (INPUT_VALUE.length === 0) {
			return;
		}

		const NEW_TASK = this.#templateTask(INPUT_VALUE);

		this.#todoList.innerHTML += NEW_TASK;
		this.#resetMainInput();
	}

	// /**
	//  * @param {HTMLInputElement} checkbox Input checkbox clicked
	//  */
	// completedTask(checkbox) {
	// 	const IS_CHECKED = checkbox.checked;
	// 	const VIEW = checkbox.parentElement;
	// 	const LIST_ITEM = VIEW.parentElement;

	// 	if (IS_CHECKED) {
	// 		LIST_ITEM.classList.add('completed');
	// 		LIST_ITEM.classList.remove('pending');
	// 	} else {
	// 		LIST_ITEM.classList.remove('completed');
	// 		LIST_ITEM.classList.add('pending');
	// 	}
	// }

	/**
	 * @param {string} task - The task to be added to the list.
	 * @returns {string} Template task.
	 */
	#templateTask(task) {
		const TASK = task.trim();
		const TEMPLATE = /*html*/ `
			<li class="pending">
				<div class="view">
					<input
						class="toggle"
						type="checkbox"
					/>
					<label>${TASK}</label>
					<button class="destroy"></button>
				</div>
				<input
					type="text"
					class="edit"
					value="${TASK}"
				/>
			</li>
		`;

		return TEMPLATE;
	}

	#resetMainInput() {
		this.#newTaskInput.value = '';
		this.#newTaskInput.focus();
	}
}

const TODO = new TodoList();

hiddenShowMainAndFooter();

document.addEventListener('keyup', (event) => {
	const KEY = event.code;

	const ENTER_KEYS = [Keys.ENTER, Keys.NUMPADENTER];

	if (ENTER_KEYS.includes(KEY)) {
		TODO.addNewTask();
	}
});

// document.addEventListener('click', (event) => {
// 	const { target } = event;
// 	const IS_CHECKBOX =
// 		target instanceof HTMLInputElement &&
// 		target.classList.contains('toggle');

// 	if (IS_CHECKBOX) {
// 		TODO.completedTask(target);
// 	}
// });
