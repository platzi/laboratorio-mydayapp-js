
import { addTaskElementToDOM, createTaskElement } from './taskCreator';
import { SELECTORS } from "./constants";
import { filterCount } from "./counterLogic";


const toDoList = SELECTORS.TODO_LIST;
const main = SELECTORS.MAIN;
const footer = SELECTORS.FOOTER;


export let tasksList = [];

export function saveTask() {
    localStorage.setItem("mydayapp-js", JSON.stringify(tasksList));
}

export function loadSavedTasks() {
    toDoList.innerHTML = '';

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

        filterCount(tasksList);
    }
}

export function clearCompletedTasks() {
    tasksList = tasksList.filter(task => !task.completed);
    saveTask();
}