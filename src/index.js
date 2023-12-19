import "./css/base.css";
import { getTasks, setTask, removeTask } from "./js/storage";
import { itemChage, numbersItemsLeft } from "./js/utils";


const todoList = document.querySelector(".todo-list");
const footer = document.querySelector(".footer");
const todoCount = document.querySelector(".todo-count");
const load = document.querySelector("body").onload = renderSections();

function renderCount() {
    if (getTasks().length !== 1) {
        return `<strong>${numbersItemsLeft()}</strong> items left`
    } else {
        return `<strong>${numbersItemsLeft()}</strong> item left`
    }
}

function renderSections() {
    todoList.innerHTML = ""

    if (getTasks().length === 0) {
        todoList.classList.add("hidden");
        footer.classList.add("hidden");
    } else {
        todoList.classList.remove("hidden");
        footer.classList.remove("hidden");

        todoList.innerHTML += getTasks().map((task) => (
            `<li ${task.completed ? 'class="completed"' : ""}>
                <div class="view">
                    <input class="toggle ${task.id}" type="checkbox" ${task.completed ? "checked" : ""}/>
                    <label>${task.title}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="${task.title}"/>
            </li>`
        ))

        todoCount.innerHTML = renderCount()
    }
}

function addTask() {
    const mainInput = document.querySelector(".new-todo");

    mainInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const task = {
                id: `task${getTasks().length + 1}`,
                title: (e.target.value).trim(),
                completed: false
            }
            setTask(task)
            e.target.value = "";
            renderSections()
        }
    })

    todoCount.innerHTML = renderCount()
}

function completedTask() {
    const toggle = document.querySelectorAll(".toggle");
    toggle.forEach((item) => {
        item.addEventListener("click", (e) => {
            if (e.target.checked) {
                itemChage(e.target, true)
                todoCount.innerHTML = renderCount()
            } else {
                itemChage(e.target, false);
                todoCount.innerHTML = renderCount()
            }
        })
    })
}

function editedTask() {
    const edit = document.querySelectorAll(".view label");
    edit.forEach((item) => {
        item.addEventListener("dblclick", (e) => {
            e.target.parentElement.parentElement.classList.add("editing")
        })
    })
}

addTask()
completedTask()
editedTask()