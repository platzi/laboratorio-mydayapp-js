import { SELECTORS } from "./constants";  
const toDoCountSpan = SELECTORS.TODO_COUNT_SPAN;
const main = SELECTORS.MAIN;
const footer = SELECTORS.FOOTER;

export let toDoCount = 0;


export function counter() {
    toDoCount++;
    updateCounter();
}

export function substractCounter() {
    toDoCount--;
    if (toDoCount <= 0) {
        const hasPendingTasks = tasksList.some(task => !task.completed);
        if (!hasPendingTasks) {
            toDoCount = 0;
            return;
        }
    }
    updateCounter();
}

export function filterCount(taskArr) {
    toDoCount = taskArr.filter(tarea => !tarea.completed).length;
    if (taskArr.length > 0) {
        main.classList.remove('hidden');
        footer.classList.remove('hidden');
    } else {
        main.classList.add('hidden');
        footer.classList.add('hidden');
    }
}


function updateCounter() {
    toDoCountSpan.innerHTML = `
        <strong>${toDoCount}</strong> ${toDoCount === 1 ? 'item' : 'items'} left
    `;
}