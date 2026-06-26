import "./css/base.css";

let todo = localStorage.getItem('todo') || [];
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

function renderTodo() {
	if (todo.length === 0) {
		main.style.display = 'none';
		footer.style.display = 'none';
	} else {
		main.style.display = 'block';
		footer.style.display = 'block';
	}
}

renderTodo();