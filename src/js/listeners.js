import { TODO } from '../index';
import { ENTER_KEYS } from './utils';

document.addEventListener('keyup', (event) => {
	const { code } = event;
	const IS_KEY_ENTER = ENTER_KEYS.includes(code);

	if (!IS_KEY_ENTER) {
		return;
	}

	const { target } = event;
	const IS_INPUT_EDIT =
		target instanceof HTMLInputElement && target.classList.contains('edit');

	if (IS_INPUT_EDIT) {
		TODO.exitEditing();
	} else {
		TODO.addNewTask();
	}
});

document.addEventListener('click', (event) => {
	const { target } = event;
	const IS_CHECKBOX =
		target instanceof HTMLInputElement &&
		target.classList.contains('toggle');

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
	TODO.exitEditing();
});
