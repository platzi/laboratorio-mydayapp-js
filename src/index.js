import "./css/base.css";

let todoList = JSON.parse(localStorage.getItem("mydayapp-js")) || [];

localStorage.setItem("mydayapp-js", JSON.stringify(todoList));

const mainSection = document.querySelector(".main")
const footerSection = document.querySelector(".footer")

let todoListLS = []

const  renderTodoList = () => {
    const todoListContainer = document.querySelector(".todo-list")
    todoListLS = JSON.parse(localStorage.getItem("mydayapp-js"))

    if (todoListLS.length === 0) {
        mainSection.style.display = "none"
        footerSection.style.display = "none"
    } else {
        mainSection.style.display = "block"
        footerSection.style.display = "block"
    }

    let todoListTem = ""
    todoListLS.map((todo, index) => {
        let todoItem = `
            <li id="todo-${index}" class=${todo.completed ? "completed" : ""}>
              <div class="view">
                <input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""} />
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

    taskActions()
}

const newTodoInput = document.querySelector(".new-todo")

newTodoInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
        createTask(newTodoInput.value)
        newTodoInput.value = ""
    }
})

function createTask(task) {
    if (!!task) {
        const todoItem = { id: Math.floor(Math.random() * 1000), title: task.trim(), completed: false}
        localStorage.setItem("mydayapp-js", JSON.stringify([...todoListLS, todoItem]))
        renderTodoList()
    }
}

function taskActions() {
    todoListLS.forEach((todo, index) => {
        const todoItemElement = document.getElementById(`todo-${index}`);

        // Checkbox
        const checkboxElement = todoItemElement.querySelector('.toggle');
        checkboxElement.addEventListener('click', () => {
            todoListLS[index].completed = !todoListLS[index].completed
        
            localStorage.setItem("mydayapp-js", JSON.stringify(todoListLS))
            renderTodoList()
        });

        // Edit
        const labelElement = todoItemElement.querySelector("label")
        labelElement.addEventListener('dblclick', () => {
            todoItemElement.classList.toggle("editing")

            const taskNewTitle = todoItemElement.querySelector(".edit")
            taskNewTitle.focus()
            
            taskNewTitle.addEventListener('keyup', (e) => {
                if (e.keyCode === 13 && !e.shiftKey) {
                    todoListLS[index].title = taskNewTitle.value.trim()
                    
                    localStorage.setItem("mydayapp-js", JSON.stringify(todoListLS))
                    renderTodoList()
                } else if (e.keyCode === 27) {
                    todoItemElement.classList.remove("editing")
                    taskNewTitle.value = labelElement.innerText
                }
            })
        })

        // Delete
        const deleteElement = todoItemElement.querySelector(".destroy")
        deleteElement.addEventListener('click', () => {
            todoListLS.splice(index, 1)
            localStorage.setItem("mydayapp-js", JSON.stringify(todoListLS))
            renderTodoList()
        })
    });
}

renderTodoList()