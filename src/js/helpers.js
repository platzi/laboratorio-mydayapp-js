export const addItemTemplate = (item) => {
    const itemTemplate = `<li ${item.completed ? "class = \"completed\"" : "" }>
        <div class="view">
            <input class="toggle" type="checkbox"  ${item.completed ? "checked" : "" } />
            <label>${item.title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.title}" />
    </li>`;
    document.querySelector(".todo-list").insertAdjacentHTML("beforeend", itemTemplate);
}

export const pendingItemsCounter = (counter) => {
    document.querySelector(".todo-count").innerHTML = `${counter} ${counter === 1 ? "item" : "items" } left`;
}