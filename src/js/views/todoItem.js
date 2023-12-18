export const todoItem = (toDo) => {
    const li = document.createElement('li');
    li.classList.add(toDo.completed ? 'completed' : null);

    li.innerHTML = `
        <div class="view">
            <input class="toggle" type="checkbox" ${toDo.completed ? 'checked' : ''} />
            <label>${toDo.title}</label>
            <button class="destroy" ></button>
        </div>
        <input class="edit" value="Learn JavaScript" />
    `;

    return li;
};