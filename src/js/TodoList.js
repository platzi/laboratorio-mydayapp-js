import { TODO_STORE } from '../index';
import { Operation, StatusTask } from './types';

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
	 * @type {number} Number of pending tasks.
	 */
	#counter = TODO_STORE.getNumberOfPendingTasks();

	/**
	 * Counter of pending tasks
	 * @type {HTMLButtonElement} Number of pending tasks.
	 */
	#clearCompletedButton = /** @type {HTMLButtonElement} */ (
		document.querySelector('footer > button')
	);

	/**
	 * Add new task to todo list.
	 * @public
	 */
	addNewTask() {
		const INPUT_VALUE = this.#newTaskInput.value;

		if (INPUT_VALUE.length === 0) {
			return;
		}

		const NEW_VALUE = INPUT_VALUE.trim();
		/** @type {import('./TodoListStore').Task} task */
		const NEW_TASK = { title: NEW_VALUE, completed: false };
		const NEW_TASK_HTML = this.#templateTask(NEW_TASK);

		this.#todoListContainer.append(NEW_TASK_HTML);
		this.#resetMainInput();
		this.hiddenShowMainAndFooter();
		this.#addMinusCounter(Operation.Plus);
		TODO_STORE.addNewTask(NEW_VALUE);
	}

	/**
	 * Mark or unmark task as completed.
	 * @public
	 * @param {HTMLInputElement} checkbox Input checkbox clicked.
	 */
	markTask(checkbox) {
		const IS_CHECKED = checkbox.checked;
		const LIST_ITEM = this.#getTaskContainer(checkbox);

		if (IS_CHECKED) {
			LIST_ITEM.classList.add(StatusTask.Completed);
			LIST_ITEM.classList.remove(StatusTask.Pending);
			this.#addMinusCounter(Operation.Minus);
		} else {
			LIST_ITEM.classList.remove(StatusTask.Completed);
			LIST_ITEM.classList.add(StatusTask.Pending);
			this.#addMinusCounter(Operation.Plus);
		}

		TODO_STORE.markTask(LIST_ITEM, IS_CHECKED);
		this.#hiddenShowClearCompletedButton();
	}

	/**
	 * Edit current task when the user make double click on the task title.
	 * @public
	 * @param {HTMLLabelElement} label Label doble clicked.
	 */
	editTask(label) {
		const LIST_ITEM = this.#getTaskContainer(label);
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

		const LIST_ITEM = this.#getTaskContainer(LABEL);
		const INPUT_EDIT = this.#getInputEditing(LABEL);

		if (INPUT_EDIT.value.length === 0) {
			this.#hiddenOrShowAnotherTasks();

			this.deleteTask(LABEL);
			TODO_STORE.deleteTask(LIST_ITEM);

			return;
		}

		const NEW_TEXT = INPUT_EDIT.value.trim();

		TODO_STORE.editTask(LABEL, NEW_TEXT);
		LABEL.innerText = NEW_TEXT;
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

		const LIST_ITEM = this.#getTaskContainer(LABEL);
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

	/**
	 * Delete task from todo list.
	 * @param {HTMLButtonElement | HTMLLabelElement} element Child element from li tag.
	 */
	deleteTask(element) {
		const LIST_ITEM = this.#getTaskContainer(element);

		LIST_ITEM.remove();
		this.hiddenShowMainAndFooter();
		TODO_STORE.deleteTask(LIST_ITEM);

		if (LIST_ITEM.classList.contains('completed')) {
			return;
		}

		this.#addMinusCounter(Operation.Minus);
	}

	/**
	 * When de user press "Clear completed" button, all completed task will be deleted.
	 */
	clearCompletedTasks() {
		const COMPLETED_TASKS = Array.from(
			this.#todoListContainer.querySelectorAll('.completed'),
		);

		for (const TASK of COMPLETED_TASKS) {
			TASK.remove();
		}

		this.hiddenShowMainAndFooter();
		this.#hiddenShowClearCompletedButton();
	}

	/**
	 * Print all task in local storage.
	 */
	init() {
		const HAS_TASK = TODO_STORE.getNumberOfPendingTasks() > 0;

		if (!HAS_TASK) {
			return;
		}

		const TASKS = TODO_STORE.getTasks();

		const TASKS_HTML = TASKS.map((task) => this.#templateTask(task));

		this.#todoListContainer.append(...TASKS_HTML);

		/** @type {HTMLElement} */ (
			this.#counterFooterContainer.children[0]
		).innerText = this.#counter.toString();
	}

	/**
	 * Check if .todo-list class is empty.
	 * @returns {boolean} If there are elements return true.
	 */
	#isTodoListEmpty() {
		return this.#todoListContainer.children.length === 0;
	}

	/**
	 * @param {HTMLInputElement | HTMLLabelElement | HTMLButtonElement} children It is tag to use for search li tag.
	 * @returns {HTMLLIElement} List item of the task that contains div.class and input.edit.
	 */
	#getTaskContainer(children) {
		const DIV_VIEW = /** @type {HTMLDivElement}*/ (children.parentElement);

		return /** @type {HTMLLIElement}*/ (DIV_VIEW.parentElement);
	}

	/**
	 * @param {HTMLInputElement | HTMLLabelElement | HTMLButtonElement} children It is tag to use for search li tag.
	 * @returns {HTMLInputElement} The input for editing a current task.
	 */
	#getInputEditing(children) {
		const LIST_ITEM = this.#getTaskContainer(children);

		return /** @type {HTMLInputElement} */ (LIST_ITEM.children[1]);
	}

	/**
	 * Template task to be added to the list.
	 * @param {import('./TodoListStore').Task} task - The task to be added to the list.
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
		LIST_ITEM.classList.add(task.completed ? 'completed' : 'pending');
		DIV_VIEW.classList.add('view');
		TOGGLE.classList.add('toggle');
		DESTROY_BUTTON.classList.add('destroy');
		EDIT.classList.add('edit');

		// Add type input
		TOGGLE.type = 'checkbox';
		EDIT.type = 'text';

		// Add content
		LABEL.innerText = task.title;
		EDIT.value = task.title;
		TOGGLE.checked = task.completed;

		DIV_VIEW.append(TOGGLE, LABEL, DESTROY_BUTTON);
		LIST_ITEM.append(DIV_VIEW, EDIT);

		return LIST_ITEM;
	}

	/** When the user adds a new task, the main input is cleared */
	#resetMainInput() {
		this.#newTaskInput.value = '';
		this.#newTaskInput.focus();
	}

	/** Hide all tasks that not have "editing" class, and show all tasks have "hidden" class. */
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

	/** Hide "clear completed" button when do not have tasks with "completed" class. */
	#hiddenShowClearCompletedButton() {
		const COMPLETED_TASKS = Array.from(
			this.#todoListContainer.querySelectorAll('.completed'),
		);

		if (COMPLETED_TASKS.length === 0) {
			this.#clearCompletedButton.classList.add('hidden');

			return;
		}

		this.#clearCompletedButton.classList.remove('hidden');
		this.#clearCompletedButton.classList.add('clear-completed');
	}
}
