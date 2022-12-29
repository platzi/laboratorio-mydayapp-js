function addTodo({title}) {
    let todosLength = document.getElementsByClassName('todo-list')[0].childElementCount
    let TODO = {
        id: todosLength ? todosLength + 1 : 1,
        title: title,
        completed: false,
    }

    var todo = document.createElement("li");
    todo.setAttribute('id', TODO.id)
    todo.innerHTML = `
    <div class="view">
        <input class="toggle" type="checkbox" />
        <label>${TODO.title}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="${TODO.title}" />
  `;
    
    let todos = document.querySelector('.todo-list')
    todos.appendChild(todo);
}

export {
    addTodo
}