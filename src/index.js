import "./css/base.css";

let todoList = JSON.parse(localStorage.getItem("mydayapp-js")) || [];

localStorage.setItem("mydayapp-js", JSON.stringify(todoList));

const mainSection = document.querySelector(".main")
const footerSection = document.querySelector(".footer")

const  renderTodoList = () => {
    const todoListContainer = document.querySelector(".todo-list")
    const todoListLS = JSON.parse(localStorage.getItem("mydayapp-js"))

    if (todoListLS.length === 0) {
        mainSection.style.display = "none"
        footerSection.style.display = "none"
    } else {
        mainSection.style.display = "block"
        footerSection.style.display = "block"
    }

    console.log("Rendering...")
    let todoListTem = ""
    todoListLS.map(todo => {
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
    console.log("Rendered")
}

renderTodoList()

const newTodoInput = document.querySelector(".new-todo")

newTodoInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
        createTask(newTodoInput.value)
        newTodoInput.value = ""
    }
})

const createTask = (task) => {
    if (!!task) {
        const todoListLS = JSON.parse(localStorage.getItem("mydayapp-js"))
        const todoItem = { id: Math.floor(Math.random() * 1000), title: task.trim(), isCompleted: false}
        localStorage.setItem("mydayapp-js", JSON.stringify([...todoListLS, todoItem]))
        renderTodoList()
    }
}