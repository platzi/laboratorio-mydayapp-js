import "./css/base.css";

let todo = JSON.parse(localStorage.getItem('mydayapp-js')) || [];
let currentRoute = '#/';
const main = document.querySelector('#main');
const footer = document.querySelector('#footer');
const todoList = document.querySelector('.todo-list');
const clearCompleted = document.querySelector('.clear-completed');

function renderTodo() {
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
	const todoCount = document.querySelector('.todo-count');

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

	localStorage.setItem('mydayapp-js', JSON.stringify(todo));
}

function createTodo() {
	const newTodoInput = document.querySelector('.new-todo');
	const newTodoValue = newTodoInput.value.trim();

	if (!newTodoValue) {
		return;
	}

	const newTodo = {
		id: crypto.randomUUID(),
		title: newTodoValue,
		completed: false
	};

	todo.push(newTodo);
	newTodoInput.value = '';

	renderTodo();
}

document.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		const focusElement = document.activeElement;

		if (focusElement.classList.contains('new-todo')) {
			createTodo();
			return;
		}

		if (focusElement.classList.contains('edit')) {
			const id = focusElement.closest('li').id;
			const text = focusElement.value.trim();

			editTodo(id, text);
			return;
		}
	}

	if (e.key === 'Escape') {
		renderTodo();
	}
});

function completeTodo(id) {
	const item = todo.find(item => item.id === id);
	item.completed = !item.completed;

	renderTodo();
}

function editTodo(id, text) {
	const item = todo.find(item => item.id === id);
	item.title = text;

	renderTodo();
}

function deleteTodo(id) {
	const index = todo.findIndex(item => item.id === id);
	if (index !== -1) {
		todo.splice(index, 1);
	}

	renderTodo();
}

document.addEventListener('click', e => {
	const target = e.target;

	if (target.classList.contains('toggle')) {
		const id = target.closest('li').id;

		completeTodo(id);
	}

	if (target.classList.contains('destroy')) {
		const id = target.closest('li').id;
		deleteTodo(id);
	}
});

document.addEventListener('dblclick', e => {
	const target = e.target;

	if (target.tagName === 'LABEL') {
		const item = target.closest('li');
		item.classList.add('editing');
		item.querySelector('.edit').focus();
	}
});

clearCompleted.addEventListener('click', () => {
	todo = todo.filter(item => !item.completed);

	renderTodo();
});

function handleRoute() {
	const hash = window.location.hash || '#/';

	if (hash === '#/' || hash === '#/pending' || hash === '#/completed') {
		currentRoute = hash;
	} else {
		currentRoute = '#/';
	}

	renderTodo();
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);