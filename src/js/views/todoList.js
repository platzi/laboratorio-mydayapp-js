import { todoItem } from './todoItem';

const LIST_ID = 'todo-list';

export const renderNewList = (toDosList) => {
    const todoList = document.getElementById(LIST_ID);
    if (!todoList) return;

    toDosList.forEach((toDo) => {
        const todoItemElement = todoItem(toDo);
        todoList.appendChild(todoItemElement);
    });
}
