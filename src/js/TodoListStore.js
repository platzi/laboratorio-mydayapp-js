/**
 * @typedef {object} Task
 * @property {string} title - The value property of the Task.
 * @property {boolean} completed - The completed status of the Task.
 */

/**
 * The TodoListStore class is responsible for managing the store in local storage.
 * @public
 * @class
 */
export class TodoListStore {
	/** @type {Storage} */
	#STORE = globalThis.localStorage;

	/** @typedef {string} */
	#TASKS_KEY = 'mydayapp-js';

	/** @typedef {string} */
	#TASKS_STORE = this.#STORE.getItem(this.#TASKS_KEY) ?? '[]';

	constructor() {
		this.#checkStore();
	}

	/**
	 *	Add new task to the store when the user add a new task in todo list.
	 * @public
	 * @param {string} value Value the new task.
	 */
	addNewTask(value) {
		/** @type {Task[]} */
		const TASKS = JSON.parse(this.#TASKS_STORE);

		/** @type {Task} */
		const NEW_TASK = { title: value, completed: false };

		TASKS.push(NEW_TASK);
		this.#setNewValues(TASKS);
		this.getNumberOfTasks();
	}

	/**
	 * Change the status of the task when the user mark or unmark the task.
	 * @public
	 * @param {HTMLLIElement} listItem List item that contain the task mark or unmark.
	 * @param {boolean} status Status of task if the task is marked or unmarked.
	 */
	markTask(listItem, status) {
		const LABEL = /** @type {HTMLLIElement}*/ (
			listItem.children[0].children[1]
		);

		/** @type {Task[]} */
		const TASKS = JSON.parse(this.#TASKS_STORE);
		const MARKED_TASK_INDEX = this.#findIndexTask(LABEL.innerText);

		TASKS[MARKED_TASK_INDEX].completed = status;
		this.#setNewValues(TASKS);
	}

	/**
	 * Delete the task from the store when the user delete the task.
	 * @public
	 * @param {HTMLLIElement} listItem List item that contain the task deleted.
	 */
	deleteTask(listItem) {
		const LABEL = /** @type {HTMLLIElement}*/ (
			listItem.children[0].children[1]
		);

		/** @type {Task[]} */
		const TASKS = JSON.parse(this.#TASKS_STORE);
		const DELETED_TASK_INDEX = this.#findIndexTask(LABEL.innerText);

		TASKS.splice(DELETED_TASK_INDEX, 1);
		this.#setNewValues(TASKS);
	}

	/**
	 * Edit the task from the store when the user edit the task.
	 * @public
	 * @param {HTMLLabelElement} label The old value from label task.
	 * @param {string} newValue The new value from input.edit task.
	 */
	editTask(label, newValue) {
		const OLD_VALUE = label.innerText;

		/** @type {Task[]} */
		const TASKS = JSON.parse(this.#TASKS_STORE);
		const EDITED_TASK_INDEX = this.#findIndexTask(OLD_VALUE);

		TASKS[EDITED_TASK_INDEX].title = newValue;
		this.#setNewValues(TASKS);
	}

	/**
	 * Get the count of task in the todo list according to storage location.
	 * @returns {number} Count of task in the todo list.
	 */
	getNumberOfTasks() {
		return /** @type {Task[]} */ (JSON.parse(this.#TASKS_STORE)).length;
	}

	/**
	 * Set new values in the store.
	 * @param {Task[]} tasks Task modified.
	 */
	#setNewValues(tasks) {
		this.#STORE.setItem(this.#TASKS_KEY, JSON.stringify(tasks));
		this.#TASKS_STORE = this.#STORE.getItem(this.#TASKS_KEY);
	}

	/**
	 * @param {string} valueSearch Value to search in the array of tasks.
	 * @returns {number} Index of the task in the array of tasks. If the task is not found, it will return -1.
	 */
	#findIndexTask(valueSearch) {
		/** @type {Task[]} */
		const TASKS = JSON.parse(this.#TASKS_STORE);

		return TASKS.findIndex((task) => task.title === valueSearch);
	}

	/**
	 *	Check if the store is empty. If it is empty, it will add an empty array to the store.
	 */
	#checkStore() {
		if (this.#STORE.getItem(this.#TASKS_KEY)) {
			return;
		}

		this.#STORE.setItem(this.#TASKS_KEY, '[]');
	}
}
