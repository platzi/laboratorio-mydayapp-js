import "./css/base.css";


import { handleHashChange } from './js/navigation';
import { loadSavedTasks } from './js/localStorage';
import { showClearCompleted } from './js/showClearBtn';
import { mainInput } from './js/main'


mainInput();

window.addEventListener('hashchange', handleHashChange);

window.onload = () => {
    loadSavedTasks();
    showClearCompleted();
}






