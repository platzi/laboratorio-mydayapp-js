import { SELECTORS } from "./constants";  
import { tasksList, clearCompletedTasks } from './localStorage';


const main = SELECTORS.MAIN;
const footer = SELECTORS.FOOTER;
const clearCompletedButton = SELECTORS.CLEAR_COMPLETED_BUTTON;


export function showClearCompleted() {
    const hasCompletedTasks = tasksList.some(task => task.completed);

    if (!hasCompletedTasks) clearCompletedButton.classList.add('hidden');
    else clearCompletedButton.classList.remove('hidden');
}

export function clearCompleted() {
    const toDoListLi = document.querySelectorAll('ul.todo-list li');

    const pendingTasksText = Array.from(toDoListLi)
        .filter(elem => !elem.classList.contains('completed'))
        .map(elem => elem.querySelector('label').innerText);

    toDoListLi.forEach(elem => {
        if (elem.classList.contains('completed')) {
            elem.remove();
        }
    });

    clearCompletedTasks()

    const hasTasks = tasksList.length > 0;

    main.classList.toggle('hidden', !hasTasks);
    footer.classList.toggle('hidden', !hasTasks);

    showClearCompleted();
}
clearCompletedButton.addEventListener('click', clearCompleted);
