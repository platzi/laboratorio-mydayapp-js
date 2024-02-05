import { FILTERS, SELECTORS } from "./constants";  
import { loadSavedTasks, tasksList } from './localStorage';
import { addTaskElementToDOM, createTaskElement } from './taskCreator';


const allFilterLink = FILTERS.ALL_FILTER_LINK;
const pendingFilterLink = FILTERS.PENDING_FILTER_LINK;
const completedFilterLink = FILTERS.COMPLETED_FILTER_LINK;
const toDoList = SELECTORS.TODO_LIST;



export function handleHashChange() {
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
    loadSavedTasks();
}

function showPendingTasks() {
    const pendingTasks = getPendingTasks();

    toDoList.innerHTML = '';

    pendingTasks.forEach(task => {
        const li = createTaskElement(task);
        addTaskElementToDOM(li, task);
    });
}

function showCompletedTasks() {
    const completedTasks = getCompletedTasks();

    toDoList.innerHTML = '';

    completedTasks.forEach(task => {
        const li = createTaskElement(task);
        addTaskElementToDOM(li, task);
    });
}