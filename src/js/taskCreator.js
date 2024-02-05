import { SELECTORS } from "./constants";
import { counter, substractCounter, } from "./counterLogic";
import { saveTask, tasksList } from "./localStorage";
import { showClearCompleted } from './showClearBtn';


const toDoList = SELECTORS.TODO_LIST;


export function createTaskElement(task) {
    const li = document.createElement('li');

    const div = document.createElement('div');
    div.classList.add('view');
    li.appendChild(div);

    const checkbox = document.createElement('input');
    checkbox.classList.add('toggle');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = task.completed;
    div.appendChild(checkbox);

    const label = document.createElement('label');
    label.innerText = task.title;
    div.appendChild(label);

    const button = document.createElement('button');
    button.classList.add('destroy');
    div.appendChild(button);

    const outerInput = document.createElement('input');
    outerInput.classList.add('edit');
    outerInput.setAttribute('value', label.innerText.trim());


    label.addEventListener('dblclick', () => {
        li.classList.add('editing');

        const outerInput = li.querySelector('.edit');

        if (li.classList.contains('editing')) {
            outerInput.focus();

            outerInput.addEventListener('blur', () => {
                task.title = outerInput.value.trim();
                saveTask();
                li.classList.remove('editing');
            });

            outerInput.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    li.classList.remove('editing');
                    label.innerText = task.title.trim();
                    outerInput.value = task.title.trim();
                }

                if (event.key === 'Enter') {
                    li.classList.remove('editing');

                    let editedText = outerInput.value.trim();

                    editedText = editedText.replace(/\s{2,}/g, ' ');

                    if (editedText) {
                        label.innerText = editedText;
                        outerInput.value = editedText;
                        task.title = editedText;
                        saveTask();
                    } else {
                        li.remove();
                        substractCounter();
                        deleteTask(task.title);
                    }
                }
            });
        }
    });

    button.addEventListener('click', () => {
        if (li.classList.contains('completed')) {
            deleteTask(task);
            li.remove();
        } else {
            deleteTask(task);
            li.remove();
            substractCounter();
        }
    });
    li.appendChild(outerInput);

    return li
}

export function addTaskElementToDOM(li, task) {
    toDoList.appendChild(li);
    isCheckboxCheck(li, task);
    if (!task.completed && window.location.hash !== '#/pending') {
        counter();
    }
}

export function deleteTask(task) {
    const index = tasksList.findIndex(t => t.id === task.id);

    if (index !== -1) {
        tasksList.splice(index, 1);

        saveTask();
    }
}

function isCheckboxCheck(li, task) {
    const checkbox = li.querySelector('.toggle');
    checkbox.checked = task.completed;

    li.classList.remove('editing', 'completed');
    
    if (task.completed) {
        li.classList.add('completed');
    }

    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        li.classList.toggle('completed', task.completed);

        if (task.completed) {
            substractCounter();
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
            counter();
        }
        saveTask();

        showClearCompleted();
    });

}