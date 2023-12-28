import { hiddenShowMainAndFooter } from '../index';

/**
 * The TodoList class is responsible for managing the todo list.
 * @public
 * @class
 */
export class TodoList {
	#todoList = /** @type {HTMLUListElement} */ (
		document.querySelector('.todo-list')
	);

	/** @type {HTMLInputElement} */
	#newTaskInput = /** @type {HTMLInputElement} */ (
		document.querySelector('.new-todo')
	);

	/**
	 * Add new task to todo list.
	  @public */
	addNewTask() {
		const INPUT_VALUE = this.#newTaskInput.value;

		if (INPUT_VALUE.length === 0) {
			return;
		}

		const NEW_TASK = this.#templateTask(INPUT_VALUE);

		this.#todoList.innerHTML += NEW_TASK;
		this.#resetMainInput();
		hiddenShowMainAndFooter();
	}

	/**
	 * Mark or unmark task as completed.
	 * @public
	 * @param {HTMLInputElement} checkbox Input checkbox clicked.
	 */
	markTask(checkbox) {
		const IS_CHECKED = checkbox.checked;
		const VIEW = checkbox.parentElement;
		const LIST_ITEM = VIEW.parentElement;

		if (IS_CHECKED) {
			LIST_ITEM.classList.add('completed');
			LIST_ITEM.classList.remove('pending');
		} else {
			LIST_ITEM.classList.remove('completed');
			LIST_ITEM.classList.add('pending');
		}
	}

	/**
	 * Edit current task when the user make double click on the task title.
	 * @public
	 * @param {HTMLLabelElement} label Label doble clicked.
	 */
	editTask(label) {
		const VIEW = label.parentElement;
		const LIST_ITEM = VIEW.parentElement;
		const INPUT_EDIT = /** @type {HTMLInputElement} */ (
			LIST_ITEM.children[1]
		);
		const END = INPUT_EDIT.value.length;

		LIST_ITEM.classList.add('editing');
		INPUT_EDIT.setSelectionRange(END, END);
		INPUT_EDIT.focus();
	}

	/**
	 * Exit editing of the selected task.
	 * @public
	 */
	exitEditing() {
		const LABEL = document.querySelector('.editing label');

		if (!(LABEL instanceof HTMLLabelElement)) {
			return;
		}

		const VIEW = LABEL.parentElement;
		const LIST_ITEM = VIEW.parentElement;
		const INPUT_EDIT = /** @type {HTMLInputElement} */ (
			LIST_ITEM.children[1]
		);

		if (INPUT_EDIT.value.length === 0) {
			//! Código provisorio hasta hacer el método que elimina las tareas
			LIST_ITEM.remove();
			hiddenShowMainAndFooter();

			return;
		}

		LABEL.innerText = INPUT_EDIT.value;
		LIST_ITEM.classList.remove('editing');
	}

	/**
	 * Template task to be added to the list.
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

	/** When the user adds a new task, the main input is cleared */
	#resetMainInput() {
		this.#newTaskInput.value = '';
		this.#newTaskInput.focus();
	}
}
