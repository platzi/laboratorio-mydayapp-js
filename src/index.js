import "./css/base.css";
import { getTasks, setTask, removeTask } from "./js/storage";
import { itemChage, numbersItemsLeft } from "./js/utils";

const todoList = document.querySelector(".todo-list");
const footer = document.querySelector(".footer");
const todoCount = document.querySelector(".todo-count");
const clearCompleted = document.querySelector(".clear-completed");
const load = document.querySelector("body").onload = renderSections();

clearCompleted.addEventListener("click", () => {
    const itemsCompleted = getTasks().filter((item) => item.completed === true)
    itemsCompleted.forEach((item) => removeTask(item))
    renderSections()
})

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
                <input class="edit ${task.id}" value="${task.title}"/>
            </li>`
        ))

        clearCompleted.innerHTML = getTasks().filter((item) => item.completed === true).length > 0 ? "Clear completed" : ""

        completedTask()
        editTask()

        todoCount.innerHTML = `${numbersItemsLeft() === 1 ? `<strong>${numbersItemsLeft()}</strong> item left` : `<strong>${numbersItemsLeft()}</strong> items left`}`
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
}

function completedTask() {
    const toggle = document.querySelectorAll(".toggle");
    toggle.forEach((item) => {
        item.addEventListener("click", (e) => {
            itemChage(e.target, e.target.checked)
            renderSections()
        })
    })
}

function editTask() {
    const labels = document.querySelectorAll("label");
    labels.forEach(item => {
        item.addEventListener("dblclick", (e) => {
            e.target.parentElement.parentElement.classList.add("editing");
            const edit = e.target.parentElement.nextElementSibling;
            edit.focus()
            edit.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    const itemEdited = getTasks().find((item) => {
                        if (item.id === e.target.classList[1]) {
                            item.title = (e.target.value).trim()
                            item.completed = false
                            removeTask(item)
                            return item
                        }
                    })
                    setTask(itemEdited)
                    renderSections()
                    // completedTask()
                } else if (e.key === " ") {
                    //Leave editing mode
                    renderSections()
                }
            })
        })
    })
}

addTask()
completedTask()
editTask()