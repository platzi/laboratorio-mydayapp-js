import * as controller from '../controllers/todos'


export const todoItem = (toDo, toDos) => {
    const deleteItem = (id) => {
        controller.destroy(id, toDos);
    }

    const li = document.createElement('li');
    li.classList.add(toDo.completed ? 'completed' : null);

    const div = document.createElement('div');
    div.classList.add('view');

    const checkbox = document.createElement('input');
    checkbox.classList.add('toggle');
    checkbox.type = 'checkbox';
    checkbox.checked = toDo.completed;

    const label = document.createElement('label');
    label.textContent = toDo.title;

    const button = document.createElement('button');
    button.classList.add('destroy');
    button.addEventListener('click', () => deleteItem(toDo.id));

    const input = document.createElement('input');
    input.classList.add('edit');
    input.value = 'Learn JavaScript';

    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(button);

    li.appendChild(div);
    li.appendChild(input);

    return li;
};