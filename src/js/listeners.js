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
	const IS_DELETE =
		target instanceof HTMLButtonElement &&
		target.classList.contains('destroy');

	if (IS_DELETE) {
		TODO.deleteTask(target);
	}

	if (IS_CHECKBOX) {
		TODO.markTask(target);
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
