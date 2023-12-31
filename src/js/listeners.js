import { TODO } from '../index';
import { Keys } from './types';
import { ENTER_KEYS } from './utils';

document.addEventListener('keyup', (event) => {
	const { code } = event;
	const IS_KEY_ENTER = ENTER_KEYS.includes(code);
	const IS_KEY_ESC = code === Keys.Escape;

	if (!IS_KEY_ENTER && !IS_KEY_ESC) {
		return;
	}

	const { target } = event;
	const IS_NEW_TASK =
		target instanceof HTMLInputElement &&
		target.classList.contains('new-todo');

	if (IS_KEY_ESC) {
		TODO.exitEditingCancel();

		return;
	}

	if (IS_NEW_TASK) {
		TODO.addNewTask();
	} else {
		TODO.exitEditingSave();
	}
});

document.addEventListener('click', (event) => {
	const { target } = event;
	const IS_CHECKBOX =
		target instanceof HTMLInputElement && target.type === 'checkbox';
	const IS_DELETE_TASK =
		target instanceof HTMLButtonElement &&
		target.classList.contains('destroy');
	const IS_CLEAR_COMPLETED_BUTTON =
		target instanceof HTMLButtonElement &&
		target.classList.contains('clear-completed');

	if (IS_DELETE_TASK) {
		TODO.deleteTask(target);
	} else if (IS_CHECKBOX) {
		TODO.markTask(target);
	} else if (IS_CLEAR_COMPLETED_BUTTON) {
		TODO.clearCompletedTasks();
	}
});

document.addEventListener('dblclick', (event) => {
	const { target } = event;
	const IS_LABEL = target instanceof HTMLLabelElement;

	if (IS_LABEL) {
		TODO.editTask(target);
	}
});

document.addEventListener('click', () => {
	TODO.exitEditingSave();
});
