import "./css/base.css";


// import { newTodoInput } from "./js/selectors";
import { main, footer, newTodoInput, firstLi } from './js/selectors';

// window.onload = function() {
//     newTodoInput.focus();
// };

let toDoCount = 0;

let tasksList = [];
//constantes
const toDoList = document.querySelector('.todo-list');
const toDoCountSpan = document.querySelector('.todo-count');
const clearCompletedButton = document.querySelector('.clear-completed');


function saveTask() {
    localStorage.setItem('mydayapp-js', JSON.stringify(tasksList));
}
function deleteTask(taskText) {
    const index = tasksList.findIndex(task => task.text === taskText);

    if (index !== -1) {
        tasksList.splice(index, 1);

        saveTask();
    }
}

function loadSavedTasks() {
    let savedTasks = localStorage.getItem('mydayapp-js');
        
    if (savedTasks) {
        tasksList = JSON.parse(savedTasks);
        tasksList.forEach(task => {
            main.classList.remove('hidden');
            footer.classList.remove('hidden');

            const li = document.createElement('li');
            li.classList.add(task.completed ? 'completed' : 'pending');

            const div = document.createElement('div');
            div.classList.add('view');
            li.appendChild(div);

            const checkbox = document.createElement('input');
            checkbox.classList.add('toggle');
            checkbox.setAttribute('type', 'checkbox');
            div.appendChild(checkbox);

            const label = document.createElement('label');
            label.innerText = task.text;
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
                    label.innerText = task.text.trim();
                    outerInput.value = task.text.trim();
                }
        
                if (event.key === 'Enter') {
                    const editedText = outerInput.value.trim();
                    li.classList.toggle('editing');
                    if (editedText) {
                        label.innerText = editedText.trim();
                        outerInput.value = editedText.trim();
                    } else {
                        li.remove();
                        substractCounter();
                        deleteTask(task.text);
                    }
                }
            })
            li.appendChild(outerInput);
        
            label.addEventListener('dblclick', () => {
                li.classList.toggle('editing');
                outerInput.focus();
            })
        
            button.addEventListener('click', () => {
                deleteTask(task.text);
                li.remove();
                substractCounter();
            })
        
            toDoList.appendChild(li);
        
            isCheckboxCheck(li, task);
            
            if (!task.completed) {
                counter();
            }
        });

        toDoCount = tasksList.filter(tarea => !tarea.completed).length;

        if (tasksList.length > 0) {
            main.classList.remove('hidden');
            footer.classList.remove('hidden');
        } else {
            main.classList.add('hidden');
            footer.classList.add('hidden');
        }   
    } 
    
}
loadSavedTasks();




newTodoInput.addEventListener('change', () => {
    main.classList.remove('hidden');
    footer.classList.remove('hidden');

    const text = newTodoInput.value.trim();

    const newTask = {
        text: text,
        completed: false
    };

    tasksList.push(newTask);

    saveTask();

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
            li.classList.remove('editing');
            li.classList.add('pending');
            label.innerText = text.trim();
            outerInput.value = text.trim();
        }

        if (event.key === 'Enter') {
            const editedText = outerInput.value.trim();
            li.classList.remove('editing');
            li.classList.add('pending');
            if (editedText) {
                label.innerText = editedText.trim();
                outerInput.value = editedText.trim();
            } else {
                li.remove();
                substractCounter();
                deleteTask(newTask.text);
            }
        }
    })
    li.appendChild(outerInput);

    label.addEventListener('dblclick', () => {
        li.classList.remove('pending');
        li.classList.add('editing');
        outerInput.focus();
    })

    button.addEventListener('click', () => {
        deleteTask(text);
        li.remove();
        substractCounter();
    })

    toDoList.appendChild(li);

    isCheckboxCheck(li, newTask);

    if (!newTask.completed) {
        counter();
    }

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

    if (toDoCount <= 0) {
        const hasPendingTasks = tasksList.some(task => task.completed);
        console.log(!hasPendingTasks);
        if (!hasPendingTasks) {
            main.classList.add('hidden');
            footer.classList.add('hidden');
            toDoCount = 0;
            return;
        }
    }

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

function isCheckboxCheck(li, task) {
    const checkbox = li.querySelector('.toggle');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        if (task.completed) {
            li.classList.add('completed');
            li.classList.remove('pending');
            substractCounter();
        } else {
            li.classList.add('pending');
            li.classList.remove('completed');
            counter();
        }
        saveTask();
    });
}

function clearCompleted() {
    const toDoListLi = document.querySelectorAll('ul.todo-list li');

    toDoListLi.forEach((elem) => {
        if (elem.classList.contains('completed')) {
            deleteTask(elem.querySelector('label').innerText);
            elem.remove();
        }
    })
}
clearCompletedButton.addEventListener('click', clearCompleted);

