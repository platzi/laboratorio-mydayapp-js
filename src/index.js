import "./css/base.css";

import { sayHello } from "./js/utils";
import { getTasks, setTask, removeTask } from "./js/storage";

console.log(sayHello("Hello"));

const todoList = document.querySelector(".todo-list");
const footer = document.querySelector(".footer");
const todoCount = document.querySelector(".todo-count");
const load = document.querySelector("body").onload = renderSections();

function renderSections() {
    todoList.innerHTML = ""

    if (getTasks().length === 0) {
        todoList.classList.add("hidden");
        footer.classList.add("hidden");
    } else {
        todoList.classList.remove("hidden");
        footer.classList.remove("hidden");

        todoList.innerHTML += getTasks().map((task) => (
            `<li>
                <div class="view">
                    <input class="toggle" type="checkbox" />
                    <label>${task.title}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Learn JavaScript" />
            </li>`
        ))
    }
}

function addTask() {
    const mainInput = document.querySelector(".new-todo");

    mainInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const task = {
                id: `${getTasks().length + 1}`,
                title: (e.target.value).trim(),
                completed: false
            }
            setTask(task)
            e.target.value = "";
            renderSections()
        }
    })
}

addTask()