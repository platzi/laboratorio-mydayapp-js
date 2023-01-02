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
    })

    // Handles edit
    let edit = document.createElement('input')
    edit.setAttribute('type', 'edit')
    edit.setAttribute('class', 'hidden')
    edit.value = TODO.title
    edit.addEventListener('keydown', (event) => {
        if (event.code === 'Enter' || event.code === "Escape"){
            todo.classList.remove('editing')
            checkbox.classList.toggle('hidden')
            edit.classList.add('hidden')
            edit.classList.remove('edit')
            label.innerText = edit.value
        }
    })
    edit.addEventListener('blur', (event) => {
        console.log(edit.value)
        todo.classList.remove('editing')
        checkbox.classList.toggle('hidden')
        edit.classList.add('hidden')
        edit.classList.remove('edit')
        label.innerText = edit.value
    })

    todo.addEventListener('dblclick', () => {
        todo.classList.add('editing')
        checkbox.classList.toggle('hidden')
        edit.classList.remove('hidden')
        edit.classList.add('edit')
    })

    var label = document.createElement('label')
    label.innerText = TODO.title

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

export {
    addTodo
}