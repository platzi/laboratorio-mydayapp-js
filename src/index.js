import "./css/base.css";
import "./css/utils.scss";
import { utils, tasksCount, completedTask } from "./js/utils.js";

function in_activeTodo (){
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

        inputCheck.addEventListener('change', (event) => {
            li.classList.toggle('completed');
            if (event.target.checked){
                tasksCount.completed++;
                tasksCount.pending--;
            } else {
                tasksCount.completed--;
                tasksCount.pending++;
            }
            printItem_sCount();
        });


        const label = document.createElement('label');
        label.innerText = utils.todoInput.value.trim();

        label.addEventListener('dblclick', () => {
            if (li.classList.contains('completed')) {
                li.classList.replace('completed', 'editing');
                completedTask.value = true;
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
                    label.innerText = inputEdit.value.trim();
                    if (completedTask.value == true){
                        li.classList.replace('editing', 'completed');
                        completedTask.value = false;
                    } else {
                        li.classList.remove('editing');
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
        ++tasksCount.pending;
        utils.todoInput.value = '';
        in_activeTodo();
        printItem_sCount();
    }
});

function printItem_sCount (){
    let item_s;
    switch (tasksCount.pending) {
        case 1:
            item_s = 'item';
            break;
        default:
            item_s = 'items';
    }

    utils.todoCount.innerHTML = `<strong>${tasksCount.pending}</strong> ${item_s} left`;
}
printItem_sCount();