import "./css/base.css";

let todo = JSON.parse(localStorage.getItem('todo')) || [];
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const todoList = document.querySelector('.todo-list');

function renderTodo() {
	if (todo.length === 0) {
		main.style.display = 'none';
		footer.style.display = 'none';
	} else {
		main.style.display = 'block';
		footer.style.display = 'block';
	}

	todoList.innerHTML = '';

	todo.forEach(task => {
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
}

renderTodo();

function createTodo() {
	const newTodoInput = document.querySelector('.new-todo');
	const newTodoValue = newTodoInput.value.trim();

	if (!newTodoValue) {
		alert('El input no puede estar vacío');
		return;
	}

	const newTodo = {
		id: crypto.randomUUID(),
		title: newTodoValue,
		completed: false
	};

	todo.push(newTodo);
	localStorage.setItem('todo', JSON.stringify(todo));

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

	localStorage.setItem('todo', JSON.stringify(todo));
	renderTodo();
}

function editTodo(id, text) {
	const item = todo.find(item => item.id === id);
	item.title = text;

	localStorage.setItem('todo', JSON.stringify(todo));
	renderTodo();
}

function deleteTodo(id) {
	const item = todo.findIndex(item => item.id === id);
	todo.splice(1, item);

	console.log(id);
	

	localStorage.setItem('todo', JSON.stringify(todo));
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