import "./css/base.css";
import * as Utils from './js/utils';
import { renderTodo } from './js/ui';

document.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		const focusElement = document.activeElement;

		if (focusElement.classList.contains('new-todo')) {
			const value = focusElement.value.trim();
			if (!value) return;

			Utils.createTodo(value);
			focusElement.value = '';
			renderTodo();
			return;
		}

		if (focusElement.classList.contains('edit')) {
			const id = focusElement.closest('li').id;
			const text = focusElement.value.trim();

			if (!text) {
				return;
			}

			Utils.editTodo(id, text);
			renderTodo();
			return;
		}
	}

	if (e.key === 'Escape') {
		renderTodo();
	}
});

document.addEventListener('click', e => {
	const target = e.target;
	const listItem = target.closest('li');

	if (!listItem) return;

	if (target.classList.contains('toggle')) {
		Utils.completeTodo(listItem.id);
		renderTodo();
	}

	if (target.classList.contains('destroy')) {
		Utils.deleteTodo(listItem.id);
		renderTodo();
	}
});

document.addEventListener('dblclick', e => {
	const target = e.target;

	if (target.tagName === 'LABEL') {
		const item = target.closest('li');
		item.classList.add('editing');

		const editInput = item.querySelector('.edit');
		editInput.focus();

		const value = editInput.value;
		editInput.value = '';
		editInput.value = value;
	}
});

document.querySelector('.clear-completed').addEventListener('click', () => {
	Utils.clearCompleted();
	renderTodo();
});

function handleRoute() {
	const hash = window.location.hash || '#/';
	Utils.setRoute(hash);
	renderTodo();
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);