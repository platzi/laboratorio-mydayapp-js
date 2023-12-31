import { Operation } from './types';

/**
 * The TodoList class is responsible for managing the todo list.
 * @public
 * @class
 */
export class TodoList {
	/** @type {HTMLUListElement} */
	#todoListContainer = /** @type {HTMLUListElement} */ (
		document.querySelector('.todo-list')
	);

	/** @type {HTMLInputElement} */
	#newTaskInput = /** @type {HTMLInputElement} */ (
		document.querySelector('.new-todo')
	);

	/** @type {HTMLElement} */
	#mainContainer = /** @type {HTMLElement} */ (
		document.querySelector('.main')
	);

	/** @type {HTMLElement} */
	#footerContainer = /** @type {HTMLElement} */ (
		document.querySelector('.footer')
	);

	/** @type {HTMLSpanElement} */
	#counterFooterContainer = /** @type {HTMLSpanElement} */ (
		document.querySelector('.todo-count')
	);

	/**
	 * Counter of pending tasks
	 * @type {number} +
	 */
	#counter = 0;

	/**
	 * Add new task to todo list.
	 * @public
	 */
	addNewTask() {
		const INPUT_VALUE = this.#newTaskInput.value;

		if (INPUT_VALUE.length === 0) {
			return;
		}

		const NEW_TASK = this.#templateTask(INPUT_VALUE.trim());

		this.#todoListContainer.append(NEW_TASK);
		this.#resetMainInput();
		this.hiddenShowMainAndFooter();
		this.#addMinusCounter(Operation.Plus);
	}

	/**
	 * Mark or unmark task as completed.
	 * @public
	 * @param {HTMLInputElement} checkbox Input checkbox clicked.
	 */
	markTask(checkbox) {
		const IS_CHECKED = checkbox.checked;
		const LIST_ITEM = this.#getListItem(checkbox);

		if (IS_CHECKED) {
			LIST_ITEM.classList.add('completed');
			LIST_ITEM.classList.remove('pending');
			this.#addMinusCounter(Operation.Minus);
		} else {
			LIST_ITEM.classList.remove('completed');
			LIST_ITEM.classList.add('pending');
			this.#addMinusCounter(Operation.Plus);
		}
	}

	/**
	 * Edit current task when the user make double click on the task title.
	 * @public
	 * @param {HTMLLabelElement} label Label doble clicked.
	 */
	editTask(label) {
		const LIST_ITEM = this.#getListItem(label);
		const INPUT_EDIT = this.#getInputEditing(label);
		const END = INPUT_EDIT.value.length;

		LIST_ITEM.classList.add('editing');
		INPUT_EDIT.setSelectionRange(END, END);
		INPUT_EDIT.focus();
		this.#hiddenOrShowAnotherTasks();
	}

	/**
	 * Exit editing of the selected task and save changes.
	 * @public
	 */
	exitEditingSave() {
		const LABEL = document.querySelector('.editing label');

		if (!(LABEL instanceof HTMLLabelElement)) {
			return;
		}

		const LIST_ITEM = this.#getListItem(LABEL);
		const INPUT_EDIT = this.#getInputEditing(LABEL);

		if (INPUT_EDIT.value.length === 0) {
			this.#hiddenOrShowAnotherTasks();

			this.deleteTask(LABEL);

			return;
		}

		LABEL.innerText = INPUT_EDIT.value.trim();
		this.#hiddenOrShowAnotherTasks();
		LIST_ITEM.classList.remove('editing');
	}

	/**
	 * Exit and cancel editing of the selected task.
	 * @public
	 */
	exitEditingCancel() {
		const LABEL = document.querySelector('.editing label');

		if (!(LABEL instanceof HTMLLabelElement)) {
			return;
		}

		const LIST_ITEM = this.#getListItem(LABEL);
		const INPUT_EDIT = this.#getInputEditing(LABEL);

		this.#hiddenOrShowAnotherTasks();
		INPUT_EDIT.value = LABEL.innerText;
		LIST_ITEM.classList.remove('editing');
	}

	/**
	 * Hides or shows .main and .footer if there are not or are elements in todo list as appropriate.
	 */
	hiddenShowMainAndFooter() {
		const IS_EMPTY = this.#isTodoListEmpty();

		this.#mainContainer.style.display = IS_EMPTY ? 'none' : 'block';
		this.#footerContainer.style.display = IS_EMPTY ? 'none' : 'block';
	}

	deleteTask(button) {
		const LIST_ITEM = this.#getListItem(button);

		LIST_ITEM.remove();
		this.hiddenShowMainAndFooter();

		if (LIST_ITEM.classList.contains('completed')) {
			return;
		}

		this.#addMinusCounter(Operation.Minus);
	}

	/**
	 * Check if .todo-list class is empty.
	 * @returns {boolean} If there are elements return true.
	 */
	#isTodoListEmpty() {
		return this.#todoListContainer.children.length === 0;
	}

	/**
	 * @param {HTMLInputElement | HTMLLabelElement} children It is tag to use for search li tag.
	 * @returns {HTMLLIElement} List item of the task that contains div.class and input.edit.
	 */
	#getListItem(children) {
		const DIV_VIEW = /** @type {HTMLDivElement}*/ (children.parentElement);

		return /** @type {HTMLLIElement}*/ (DIV_VIEW.parentElement);
	}

	/**
	 * @param {HTMLInputElement | HTMLLabelElement} children It is tag to use for search li tag.
	 * @returns {HTMLInputElement} The input for editing a current task.
	 */
	#getInputEditing(children) {
		const LIST_ITEM = this.#getListItem(children);

		return /** @type {HTMLInputElement} */ (LIST_ITEM.children[1]);
	}

	/**
	 * Template task to be added to the list.
	 * @param {string} task - The task to be added to the list.
	 * @returns {HTMLLIElement} Template task.
	 */
	#templateTask(task) {
		// Create elements
		const LIST_ITEM = document.createElement('li');
		const DIV_VIEW = document.createElement('div');
		const TOGGLE = document.createElement('input');
		const LABEL = document.createElement('label');
		const DESTROY_BUTTON = document.createElement('button');
		const EDIT = document.createElement('input');

		// Add attribute class
		LIST_ITEM.classList.add('pending');
		DIV_VIEW.classList.add('view');
		TOGGLE.classList.add('toggle');
		DESTROY_BUTTON.classList.add('destroy');
		EDIT.classList.add('edit');

		// Add type input
		TOGGLE.type = 'checkbox';
		EDIT.type = 'text';

		// Add content
		LABEL.innerText = task;
		EDIT.value = task;

		DIV_VIEW.append(TOGGLE, LABEL, DESTROY_BUTTON);
		LIST_ITEM.append(DIV_VIEW, EDIT);

		return LIST_ITEM;
	}

	/** When the user adds a new task, the main input is cleared */
	#resetMainInput() {
		this.#newTaskInput.value = '';
		this.#newTaskInput.focus();
	}

	#hiddenOrShowAnotherTasks() {
		const LIST_ITEMS = Array.from(this.#todoListContainer.children);

		for (const ITEM of LIST_ITEMS) {
			if (ITEM.classList.contains('editing')) {
				continue;
			}

			if (ITEM.classList.contains('hidden')) {
				ITEM.classList.remove('hidden');

				continue;
			}

			ITEM.classList.add('hidden');
		}
	}

	/**
	 * Increase or decrease the counter of pending tasks.
	 * @param {Operation} operation If you want increase or decrease the counter.
	 */
	#addMinusCounter(operation) {
		operation === Operation.Plus ? this.#counter++ : this.#counter--;

		if (this.#counter < 0) {
			this.#counterFooterContainer.innerHTML = `<strong>0</strong> item left`;
			this.#counter = 0;

			return;
		}

		const COUNTER = `<strong>${this.#counter}</strong>`;
		const IS_UNIQUE_ITEM = this.#counter === 1;

		this.#counterFooterContainer.innerHTML = IS_UNIQUE_ITEM
			? `${COUNTER} item left`
			: `${COUNTER} items left`;
	}
}
