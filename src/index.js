import "./css/base.css";
import "./css/utils.scss";
import { utils, tasksCount } from "./js/utils.js";

function inactiveTodo (){
    if (tasksCount.all > 0){
        utils.todoContainer.classList.remove('inactive');
    } else {
        utils.todoContainer.classList.add('inactive');
    }
}

utils.todoInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && utils.todoInput.value.trim() != ''){
        const li = document.createElement('li');

        const div = document.createElement('div');
        div.classList.add('view');

        const inputCheck = document.createElement('input');
        inputCheck.classList.add('toggle');
        inputCheck.setAttribute('type', 'checkbox');

        const label = document.createElement('label');
        label.innerText = utils.todoInput.value.trim();

        const button = document.createElement('button');
        button.classList.add('destroy');

        const inputEdit = document.createElement('input');
        inputEdit.classList.add('edit');
        inputEdit.value = utils.todoInput.value;

        div.append(inputCheck, label, button);
        li.append(div, inputEdit);
        utils.todoList.append(li);

        ++tasksCount.all;
        utils.todoInput.value = '';
        inactiveTodo();
    }
});

//Funcion 2 terminada, haz commit