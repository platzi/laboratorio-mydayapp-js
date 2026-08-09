export let todo = JSON.parse(localStorage.getItem('mydayapp-js')) || [];
export let currentRoute = '#/';

export function setRoute(route) {
	currentRoute = route;
}

export function saveToStorage() {
	localStorage.setItem('mydayapp-js', JSON.stringify(todo));
}

export function createTodo(title) {
	const newTodo = {
		id: crypto.randomUUID(),
		title: title,
		completed: false
	};
	todo.push(newTodo);
	saveToStorage();
}

export function completeTodo(id) {
	const item = todo.find(item => item.id === id);
	if (item) item.completed = !item.completed;
	saveToStorage();
}

export function editTodo(id, text) {
	const item = todo.find(item => item.id === id);
	if (item) item.title = text;
	saveToStorage();
}

export function deleteTodo(id) {
	const index = todo.findIndex(item => item.id === id);
	if (index !== -1) {
		todo.splice(index, 1);
	}
	saveToStorage();
}

export function clearCompleted() {
	todo = todo.filter(item => !item.completed);
	saveToStorage();
}