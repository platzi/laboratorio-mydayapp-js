function addTodo({title}) {
    let todosLength = document.getElementsByClassName('todo-list')[0].childElementCount
    let TODO = {
        id: todosLength ? todosLength + 1 : 1,
        title: title,
        completed: false,
    }

    var todo = document.createElement("li");
    todo.setAttribute('id', `item_${TODO.id}`)

    var containerDiv = document.createElement('div')
    containerDiv.classList.add('view')

    var checkbox = document.createElement('input')
    checkbox.setAttribute('class', 'toggle')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('value', TODO.id)
    checkbox.addEventListener('click', () => {
        todo.classList.toggle('completed')
        updateCounter()
    })

    // Handles edit
    let edit = document.createElement('input')
    edit.setAttribute('type', 'edit')
    edit.setAttribute('class', 'hidden')
    edit.value = TODO.title.trim()
    edit.setAttribute('id', TODO.id)
    edit.addEventListener('keydown', (event) => {
        let originalValue = label.innerText
        if (event.code === 'Enter'){
            label.innerText = edit.value
            
            event.target.value = event.target.value.trim()
            todo.classList.remove('editing')
            checkbox.classList.toggle('hidden')
            edit.classList.add('hidden')
            edit.classList.remove('edit')
            toggleTodos(`item_${event.target.id}`)
        }
        else if(event.code === "Escape"){
            label.innerText = originalValue
            event.target.value = originalValue

            event.target.value = event.target.value.trim()
            todo.classList.remove('editing')
            checkbox.classList.toggle('hidden')
            edit.classList.add('hidden')
            edit.classList.remove('edit')
            toggleTodos(`item_${event.target.id}`)
        }
    })
    var label = document.createElement('label')
    label.innerText = TODO.title
    label.addEventListener('dblclick', (event) => {
        toggleTodos(event.path[2].id)
        todo.classList.add('editing')
        checkbox.classList.toggle('hidden')
        edit.classList.remove('hidden')
        edit.classList.add('edit')
        edit.focus()
    })

    // Handles remove
    var button = document.createElement('button')
    button.setAttribute('class', 'destroy')
    button.setAttribute('id', TODO.id)
    button.addEventListener('click', () => {
        todo.remove()
    })


    containerDiv.appendChild(checkbox)
    containerDiv.appendChild(label)
    containerDiv.appendChild(button)
    todo.appendChild(containerDiv)
    todo.appendChild(edit)
    
    let todos = document.querySelector('.todo-list')
    todos.appendChild(todo);
}

function toggleTodos (id) {
    let todos = Array.from(document.querySelectorAll('li'))
    todos
        .filter((todo) => todo.id !== id)
        .map((element) => element.classList.toggle('hidden'))
}

function updateCounter(pendingTasK){
    let ul = document.getElementsByClassName('todo-list')[0]
        let pendingTasks = Array.from(ul.children).filter((task) => !task.classList.contains('completed'))

        let todoCounter = document.getElementsByClassName('todo-count')[0]
        todoCounter.children[0].innerHTML = pendingTasks.length
        let itemsText = pendingTasks.length === 1 ? 'item' : 'items'
        todoCounter.innerHTML = todoCounter.innerHTML.replace(/\bitem(s)?\b/, itemsText)
}

export {
    addTodo,
    updateCounter
}