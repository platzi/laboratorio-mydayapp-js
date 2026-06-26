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
			<input class="toggle" type="checkbox" ${task.completed ?? 'checked'} />
			<label>${task.title}</label>
			<button class="destroy"></button>
		</div>`;

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
		createTodo();
	}
});