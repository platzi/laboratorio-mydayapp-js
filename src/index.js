import "./css/base.css";

import { data } from './js/data.js';

import { todoArray } from './js/utils'

import { newTodo } from './js/utils';
import { todoList } from './js/utils';

newTodo.addEventListener('keyup', (e) => {
    if(e.keyCode == 13) {
        if(newTodo.value != '') {
            const newData = new data;
            newData.id = todoArray.length;
            newData.title = newTodo.value.trim();
            newData.completed = false;
            todoArray.push(newData);
            newTodo.value = '';
            console.log(todoArray);
            const todoLi = document.createElement('li');
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('view');
            const todoInput = document.createElement('input');
            todoInput.classList.add('toggle');
            todoInput.setAttribute('type', 'checkbox');
            const todoLabel = document.createElement('label');
            todoLabel.innerText = newData.title;
            const todoButton = document.createElement('button');
            todoButton.classList.add('destroy');
            const editInput = document.createElement('input');
            editInput.classList.add('edit');
            editInput.setAttribute('value', newData.title);
            todoList.appendChild(todoLi);
            todoLi.appendChild(todoDiv);
            todoDiv.appendChild(todoInput);
            todoDiv.appendChild(todoLabel);
            todoDiv.appendChild(todoButton);
            todoLi.appendChild(editInput);
        }
    } 
});