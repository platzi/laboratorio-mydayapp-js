import "./css/base.css";
import { addTodo, updateCounter, getLocalStorage, clearCompletedTasks, checkForCompletedTask, getFilterByRoute, filterTODOSByRoute} from './js/crud.js'

import { sayHello } from "./js/utils";

let inputTodo = document.getElementsByClassName('new-todo')[0]
let clearCompletedButton = document.getElementsByClassName('clear-completed')[0]
let filterButtons = document.getElementsByClassName('filters')[0].querySelectorAll('li a')

let observer = new MutationObserver(function(mutations) {
    let main = document.getElementsByClassName('main')[0]
    let footer = document.getElementsByClassName('footer')[0]
    mutations.forEach(function(mutation) {
      if (mutation.target.childElementCount === 0) {
        main.classList.add('hidden')
        footer.classList.add('hidden')
      } else {
        main.classList.remove('hidden')
        footer.classList.remove('hidden')
      }
      checkForCompletedTask()
      updateCounter()
    });
  });

  observer.observe(document.getElementsByClassName("todo-list")[0], {
    childList: true
  });

let filter = getFilterByRoute()
let TODOS = getLocalStorage(filter)
TODOS = Array.from(TODOS)
TODOS.forEach(element => {
    addTodo(element)
});

filterButtons.forEach((button) =>
{
    button.addEventListener('click', (event) => {
        filterButtons.forEach(element => element.classList.remove('selected'))
        button.classList.add('selected')
        filterTODOSByRoute(event.target.href)
    })
}
)

inputTodo.addEventListener('keypress', (event) => {
    const errorMessage = document.querySelector('.error-message');

    if (event.key === 'Enter')
    {
        if (inputTodo.value.length !== 0){
            event.preventDefault()
            addTodo({title: inputTodo.value.trim()})
            inputTodo.value = ''
            errorMessage.textContent = ''
        }
        else {
            event.target.setCustomValidity('La tarea debe contener al menos un caracter')
            errorMessage.textContent = event.target.validationMessage;
        }
    }

})

window.addEventListener('popstate', function(event) {
    filterTODOSByRoute(event.target.location.href)
});

clearCompletedButton.addEventListener('click', () => clearCompletedTasks())
console.log(sayHello("Hello"));
