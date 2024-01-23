import "./css/base.css";

import { inputEvent } from './js/utils';
import { newTodoInput } from "./js/selectors";


window.onload = function() {
    newTodoInput.focus();
};



const toDoList = document.querySelector('.todo-list');

newTodoInput.addEventListener('change', () => {
    const li = document.createElement('li');

    const div = document.createElement('div');
    div.classList.add('view');
    li.appendChild(div);

    const input = document.createElement('input');
    input.classList.add('toggle');
    input.setAttribute('type', 'checkbox');
    div.appendChild(input);

    const label = document.createElement('label');
    label.innerText = newTodoInput.value;
    div.appendChild(label);

    const button = document.createElement('button');
    button.classList.add('destroy');
    div.appendChild(button);

    const outerInput = document.createElement('input');
    outerInput.classList.add('edit');
    outerInput.value = newTodoInput.value;
    li.appendChild(outerInput);

    toDoList.appendChild(li);

    newTodoInput.value = '';
})
