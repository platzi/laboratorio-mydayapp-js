import { SELECTORS } from './constants';
import { handleHashChange } from './navigation';
import { createTaskElement, addTaskElementToDOM } from './taskCreator';
import { saveTask, tasksList } from './localStorage';


const main = SELECTORS.MAIN;
const footer = SELECTORS.FOOTER;
const newTodoInput = SELECTORS.NEW_TODO_INPUT;

export function mainInput () {
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
}