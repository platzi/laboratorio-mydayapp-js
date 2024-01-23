import "./css/base.css";

import { inputEvent } from './js/utils';
import { newTodoInput } from "./js/selectors";


// window.onload = function() {
//     newTodoInput.focus();
// };


//constantes
const toDoList = document.querySelector('.todo-list');


newTodoInput.addEventListener('change', () => {
    const li = document.createElement('li');

    const div = document.createElement('div');
    div.classList.add('view');
    li.appendChild(div);

    const checkbox = document.createElement('input');
    checkbox.classList.add('toggle');
    checkbox.setAttribute('type', 'checkbox');
    div.appendChild(checkbox);

    const label = document.createElement('label');
    label.innerText = newTodoInput.value;
    div.appendChild(label);

    const button = document.createElement('button');
    button.classList.add('destroy');
    div.appendChild(button);

    const outerInput = document.createElement('input');
    outerInput.classList.add('edit');
    outerInput.setAttribute('value', newTodoInput.value);
    outerInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            li.classList.toggle('editing');
            if (outerInput.value) {
                label.innerText = outerInput.value;
            } else {
                li.remove();
            }
        }
    })
    li.appendChild(outerInput);

    label.addEventListener('dblclick', () => {
        li.classList.toggle('editing');
        outerInput.focus();
    })

    button.addEventListener('click', () => {
        li.remove();
    })

    toDoList.appendChild(li);

    isCheckboxCheck(li);

    newTodoInput.value = '';
})


function isCheckboxCheck(li) {
        const checkbox = li.querySelector('.toggle');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) li.classList.add('completed');
            else li.classList.remove('completed');
        })
}

