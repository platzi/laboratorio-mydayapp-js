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

    var checkbox = document.createElement('input')
    checkbox.setAttribute('class', 'toggle')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('value', TODO.id)
    checkbox.addEventListener('click', () => {
        let todoItem = todo
        todoItem.classList.toggle('completed')
    })

    var label = document.createElement('label')
    label.innerText = TODO.title

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
    
    let todos = document.querySelector('.todo-list')
    todos.appendChild(todo);
}

export {
    addTodo
}