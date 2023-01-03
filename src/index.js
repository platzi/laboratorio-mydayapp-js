import "./css/base.css";
import { addTodo, updateCounter, getLocalStorage, clearCompletedTasks, checkForCompletedTask} from './js/crud.js'

import { sayHello } from "./js/utils";

let inputTodo = document.getElementsByClassName('new-todo')[0]
let clearCompletedButton = document.getElementsByClassName('clear-completed')[0]

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

let TODOS = getLocalStorage()
TODOS = Array.from(TODOS)
TODOS.forEach(element => {
    addTodo(element)
});

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

clearCompletedButton.addEventListener('click', () => clearCompletedTasks())
console.log(sayHello("Hello"));
