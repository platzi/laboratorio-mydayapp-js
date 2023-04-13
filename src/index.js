import "./css/base.css";

import { data } from './js/data.js';

import { todoArray } from './js/utils'

import { newTodo } from './js/utils';
import { todoList } from './js/utils';
import { footer } from './js/utils';
import { main } from './js/utils';
import { todoCount } from './js/utils';

function hideMainAndFooter() {  
    if(todoArray.length === 0) {
        footer.classList.add('hidden');
        main.classList.add('hidden');
    } else {
        footer.classList.remove('hidden');
        main.classList.remove('hidden');
    }
}

function itemLeft() {
    let count = 0;
    todoArray.forEach(item => {
        if(!item.completed) {
            count++;
        }
    });
    return count;
}

newTodo.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        if(newTodo.value != '') {
            const newData = new data;
            newData.id = todoArray.length;
            newData.title = newTodo.value.trim();
            newData.completed = false;
            todoArray.push(newData);
            newTodo.value = '';
            const todoLi = document.createElement('li');
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('view');
            const todoInput = document.createElement('input');
            todoInput.classList.add('toggle');
            todoInput.setAttribute('type', 'checkbox');
            const todoLabel = document.createElement('label');
            todoLabel.innerText = newData.title;
            const destroyButton = document.createElement('button');
            destroyButton.classList.add('destroy');
            const editInput = document.createElement('input');
            editInput.classList.add('edit');
            editInput.setAttribute('value', newData.title);
            todoList.appendChild(todoLi);
            todoLi.appendChild(todoDiv);
            todoDiv.appendChild(todoInput);
            todoDiv.appendChild(todoLabel);
            todoDiv.appendChild(destroyButton);
            todoLi.appendChild(editInput);
            todoInput.addEventListener('click', () => {
                if(todoInput.checked) {
                    todoLi.classList.add('completed');
                    newData.completed = true;
                } else {
                    todoLi.classList.remove('completed');
                    newData.completed = false;
                }
                todoCount.innerText = itemLeft();
            });
            todoLi.addEventListener('dblclick', () => {
                todoLi.classList.add('editing');
            });
            editInput.addEventListener('keyup', (ev) => {
                if(ev.keyCode == 13) {
                    if(editInput.value != '') {
                        newData.title = editInput.value.trim();
                        todoLabel.innerText = newData.title;
                        todoLi.classList.remove('editing');
                    }
                }
                todoCount.innerText = itemLeft();
            });
            destroyButton.addEventListener('click', () => {
                todoLi.remove();
                todoArray.splice(newData.id, 1);
                todoCount.innerText = itemLeft();
                if(todoArray.length === 0) {
                    footer.classList.add('hidden');
                    main.classList.add('hidden');
                }
            })         
        }        
        hideMainAndFooter();         
        todoCount.innerText = itemLeft();   
    }
});

hideMainAndFooter();
todoCount.innerText = itemLeft();
