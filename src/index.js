import "./css/base.css";

import { inputEvent } from './js/utils';
import { newTodoInput } from "./js/selectors";


// window.onload = function() {
//     newTodoInput.focus();
// };

let toDoCount = 0;

//constantes
const toDoList = document.querySelector('.todo-list');
const toDoCountSpan = document.querySelector('.todo-count');

newTodoInput.addEventListener('change', () => {
    const text = newTodoInput.value.trim();

    const li = document.createElement('li');
    li.classList.add('pending');

    const div = document.createElement('div');
    div.classList.add('view');
    li.appendChild(div);

    const checkbox = document.createElement('input');
    checkbox.classList.add('toggle');
    checkbox.setAttribute('type', 'checkbox');
    div.appendChild(checkbox);

    const label = document.createElement('label');
    label.innerText = text;
    div.appendChild(label);

    const button = document.createElement('button');
    button.classList.add('destroy');
    div.appendChild(button);

    const outerInput = document.createElement('input');
    outerInput.classList.add('edit');
    outerInput.setAttribute('value', label.innerText.trim());
    outerInput.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            li.classList.toggle('editing');
            label.innerText = text;
            outerInput.value = text;
        }

        if (event.key === 'Enter') {
            const editedText = outerInput.value.trim();
            li.classList.toggle('editing');
            if (editedText) {
                label.innerText = editedText;
                outerInput.value = editedText;
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
        substractCounter();
    })

    toDoList.appendChild(li);

    isCheckboxCheck(li);

    counter();

    newTodoInput.value = '';
})

function counter() {
    toDoCountSpan.innerText = '';
    toDoCount++;
    if (toDoCount == 1) {
        toDoCountSpan.innerHTML = `
            <strong>${toDoCount}</strong> item left
        `
    } else {
        toDoCountSpan.innerHTML = `
            <strong>${toDoCount}</strong> items left
        `
    }
}

function substractCounter() {
    toDoCountSpan.innerText = '';
    toDoCount--;
    if (toDoCount == 1) {
        toDoCountSpan.innerHTML = `
            <strong>${toDoCount}</strong> item left
        `
    } else {
        toDoCountSpan.innerHTML = `
            <strong>${toDoCount}</strong> items left
        `
    }
}


function isCheckboxCheck(li) {
        const checkbox = li.querySelector('.toggle');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                substractCounter();
                li.classList.add('completed');
            }
            else {
                li.classList.remove('completed');
                counter();
            }     
        })
}
