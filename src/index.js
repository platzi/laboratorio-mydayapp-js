import "./css/base.css";

import { todoList } from "./js/todoList";

console.log(todoList)

const mainSection = document.querySelector(".main")
const footerSection = document.querySelector(".footer")

if (todoList.length === 0) {
    mainSection.style.display = "none"
    footerSection.style.display = "none"
}

const todoListContainer = document.querySelector(".todo-list")

function renderTodoList() {
    console.log("Render")
    let todoListTem = ""
    todoList.map(todo => {
        let todoItem = `
            <li class=${todo.isCompleted ? "completed" : ""}>
              <div class="view">
                <input class="toggle" type="checkbox" ${todo.isCompleted ? "checked" : ""} />
                <label>${todo.title}</label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="${todo.title}" />
            </li>
        `
        todoListTem += todoItem
    })
    todoListContainer.innerHTML = todoListTem
}

renderTodoList()

const newTodoInput = document.querySelector(".new-todo")

newTodoInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
        if (!!newTodoInput.value) {
            todoList.push({ id: Symbol(Math.floor(Math.random() * 1000)), title: newTodoInput.value.trim(), isCompleted: false})
            newTodoInput.value = ""
            renderTodoList()
        }
    }
})

