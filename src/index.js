import "./css/base.css";


// import { newTodoInput } from "./js/selectors";
import { main, footer, newTodoInput, firstLi } from './js/selectors';


let toDoCount = 0;

let tasksList = [];
//constantes
const toDoList = document.querySelector('.todo-list');
const toDoCountSpan = document.querySelector('.todo-count');
const clearCompletedButton = document.querySelector('.clear-completed');
const allFilterLink = document.querySelector('.filters a[href="#/"]');
const pendingFilterLink = document.querySelector('.filters a[href="#/pending"]');
const completedFilterLink = document.querySelector('.filters a[href="#/completed"]');

window.addEventListener('hashchange', handleHashChange);

window.onload = () => {
    handleHashChange();
    loadSavedTasks();
    showClearCompleted();
}

window.addEventListener('beforeunload', () => {
    saveTask();
});

function handleHashChange() {
    const hash = window.location.hash;

    switch (hash) {
        case '#/':
            showAllTasks();
            allFilterLink.classList.add('selected');
            pendingFilterLink.classList.remove('selected');
            completedFilterLink.classList.remove('selected');
            break;
        case '#/pending':
            showPendingTasks();
            allFilterLink.classList.remove('selected');
            pendingFilterLink.classList.add('selected');
            completedFilterLink.classList.remove('selected');
            break;
        case '#/completed':
            showCompletedTasks();
            allFilterLink.classList.remove('selected');
            pendingFilterLink.classList.remove('selected');
            completedFilterLink.classList.add('selected');
            break;
    }
}
function getPendingTasks() {
    return tasksList.filter(task => !task.completed);
}

function getCompletedTasks() {
    return tasksList.filter(task => task.completed);
}


function showAllTasks() {
    loadSavedTasks()
}

function showPendingTasks() {
    const pendingTasks = getPendingTasks();

    toDoList.innerHTML = ''; // Limpiar la lista

    pendingTasks.forEach(task => {
        const li = createTaskElement(task);
        addTaskElementToDOM(li, task);
    });
}

function showCompletedTasks() {
    const completedTasks = getCompletedTasks();

    const todoList = document.querySelector('.todo-list');
    todoList.innerHTML = ''; // Limpiar la lista

    completedTasks.forEach(task => {
        const li = createTaskElement(task);
        addTaskElementToDOM(li, task);
    });
}





function showClearCompleted() {
    const hasCompletedTasks = tasksList.some(task => task.completed);

    if (!hasCompletedTasks) clearCompletedButton.classList.add('hidden');
    else clearCompletedButton.classList.remove('hidden');
}

function clearCompleted() {
    const toDoListLi = document.querySelectorAll('ul.todo-list li');

    const pendingTasksText = Array.from(toDoListLi)
        .filter(elem => !elem.classList.contains('completed'))
        .map(elem => elem.querySelector('label').innerText);

    toDoListLi.forEach(elem => {
        if (elem.classList.contains('completed')) {
            elem.remove();
        }
    });

    tasksList = tasksList.filter(task => !task.completed);
    saveTask();

    const hasTasks = tasksList.length > 0;

    main.classList.toggle('hidden', !hasTasks);
    footer.classList.toggle('hidden', !hasTasks);

    showClearCompleted();
}
clearCompletedButton.addEventListener('click', clearCompleted);






function createTaskElement(task) {
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

function addTaskElementToDOM(li, task) {
    toDoList.appendChild(li);
    isCheckboxCheck(li, task);
    if (!task.completed) {
        counter();
    }
}

function saveTask() {
    localStorage.setItem("mydayapp-js", JSON.stringify(tasksList));
}

function deleteTask(task) {
    const index = tasksList.findIndex(t => t.id === task.id);

    if (index !== -1) {
        tasksList.splice(index, 1);

        saveTask();
    }
}

function loadSavedTasks() {
    toDoList.innerHTML = ''; // Limpiar la lista

    let savedTasks = localStorage.getItem('mydayapp-js');

    if (savedTasks) {
        tasksList = JSON.parse(savedTasks);
        tasksList.forEach(task => {
            main.classList.remove('hidden');
            footer.classList.remove('hidden');
            const li = createTaskElement(task);
            
            addTaskElementToDOM(li, task);
            toDoList.appendChild(li);
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



showClearCompleted();


newTodoInput.addEventListener('change', () => {
    main.classList.remove('hidden');
    footer.classList.remove('hidden');

    let text = newTodoInput.value.trim();

    text = text.replace(/\s{2,}/g, ' ');

    const newTask = {
        id: tasksList.length + 1, 
        title: text,
        completed: false
    };

    const li = createTaskElement(newTask);

    addTaskElementToDOM(li, newTask);

    tasksList.push(newTask);
    saveTask();

    handleHashChange()

    newTodoInput.value = '';

})


function counter() {
    toDoCountSpan.innerText = '';
    toDoCount++
    if (toDoCount == 1) {
        toDoCountSpan.innerHTML = `
            <strong>${toDoCount}</strong> item left
        `
    } else {
        toDoCountSpan.innerHTML = `
            <strong>${toDoCount}</strong> items left
        `
    }
    console.log(toDoCount);
}

function substractCounter() {
    toDoCountSpan.innerText = '';
    toDoCount--
    if (toDoCount <= 0) {
        const hasPendingTasks = tasksList.some(task => task.completed);
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

    li.classList.remove('editing', 'completed');
    
    if (task.completed) {
        li.classList.add('completed');
    }

    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        li.classList.toggle('completed', task.completed);

        if (task.completed) {
            handleHashChange();
            substractCounter();
            li.classList.add('completed');
        } else {
            handleHashChange();
            li.classList.remove('completed');
            counter();
        }
        saveTask();

        showClearCompleted();
    });
}