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

        const renderCount = () => {
            if (getTasks().length !== 1) {
                return `<strong>${getTasks().length}</strong> items left`
            } else {
                return `<strong>${getTasks().length}</strong> item left`
            }
        }

        todoCount.innerHTML = renderCount()
    }
}