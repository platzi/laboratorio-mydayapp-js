import "./css/base.css";
import "./css/utils.scss";
import { utils, tasksCount, completedTask } from "./js/utils.js";

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

        inputCheck.addEventListener('change', () => {
            li.classList.toggle('completed');
        });


        const label = document.createElement('label');
        label.innerText = utils.todoInput.value.trim();

        label.addEventListener('dblclick', () => {
            if (li.classList.contains('completed')) {
                li.classList.replace('completed', 'editing');
                completedTask.value = true;
                console.log('inicializado en ' + completedTask.value);
            } else {
                li.classList.add('editing');
            }
            inputEdit.focus();
        });
        

        const button = document.createElement('button');
        button.classList.add('destroy');
        
        
        const inputEdit = document.createElement('input');
        inputEdit.classList.add('edit');
        inputEdit.value = utils.todoInput.value;

        inputEdit.addEventListener('keyup', (event) => {
            if (inputEdit.value.trim() != '') {
                if (event.keyCode === 13){
                    console.log('event ' + completedTask.value);
                    label.innerText = inputEdit.value.trim();
                    if (completedTask.value == true){
                        li.classList.replace('editing', 'completed');
                        console.log('true ' + completedTask.value);
                        completedTask.value = false;
                    } else {
                        li.classList.remove('editing');
                        console.log('false ' + completedTask.value);
                    }

                } else if (event.keyCode === 27) {
                    if (completedTask.value == true){
                        li.classList.replace('editing', 'completed');
                        completedTask.value = false;
                    } else {
                        li.classList.remove('editing');
                    }
                    inputEdit.value = label.textContent;
                }
            }
        });

        div.append(inputCheck, label, button);
        li.append(div, inputEdit);
        utils.todoList.append(li);

        ++tasksCount.all;
        utils.todoInput.value = '';
        inactiveTodo();
    }
});

