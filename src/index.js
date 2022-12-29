import "./css/base.css";
import { addTodo } from './js/crud.js'

import { sayHello } from "./js/utils";

let TODOS = []
let inputTodo = document.getElementsByClassName('new-todo')[0]

function updateUI() {
    let todosLength = document.getElementsByClassName('todo-list')[0].childElementCount
    let main = document.getElementsByClassName('main')[0]
    let footer = document.getElementsByClassName('footer')[0]

    if (todosLength === 0) {
        main.style.display = 'none'
        footer.style.display = 'none'
    }
    else {
        main.style.display = 'block'
        footer.style.display = 'block'
    }
}

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

    updateUI()
})

updateUI()
console.log(sayHello("Hello"));
