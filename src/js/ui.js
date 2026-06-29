import { todo, currentRoute } from './utils';

const main = document.querySelector('#main');
const footer = document.querySelector('#footer');
const todoList = document.querySelector('.todo-list');
const todoCount = document.querySelector('.todo-count');
const clearCompleted = document.querySelector('.clear-completed');

export function renderTodo() {
	if (todo.length === 0) {
		main.style.display = 'none';
		footer.style.display = 'none';
	} else {
		main.style.display = 'block';
		footer.style.display = 'block';
	}

	let filteredTodos = todo;
	if (currentRoute === '#/pending') {
		filteredTodos = todo.filter(item => !item.completed);
	} else if (currentRoute === '#/completed') {
		filteredTodos = todo.filter(item => item.completed);
	}

	todoList.innerHTML = '';

	filteredTodos.forEach(task => {
		const listItem = document.createElement('li');
		listItem.id = task.id;
		listItem.className = task.completed ? 'completed' : '';
		listItem.innerHTML = `
		<div class="view">
			<input class="toggle" type="checkbox" ${task.completed ? 'checked' : ''} />
			<label>${task.title}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="${task.title}" />`;

		todoList.appendChild(listItem);
	});

	const pending = todo.filter(item => !item.completed);
	const completed = todo.filter(item => item.completed);

	todoCount.innerHTML = `<strong>${pending.length}</strong> item${pending.length !== 1 ? 's' : ''} left`;

	document.querySelectorAll('.filters a').forEach(link => {
		if (link.getAttribute('href') === currentRoute) {
			link.className = 'selected';
		} else {
			link.className = '';
		}
	});

	if (completed.length === 0) {
		clearCompleted.style.display = 'none';
	} else {
		clearCompleted.style.display = 'block';
	}
}