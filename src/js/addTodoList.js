import { renderUI } from "./renderUI";
export let taskListArray = [];

export function addTodoList(text) {   
    const id = taskListArray.length + 1
    let newTask = {
        todoName: text,
        id: id,
        status: "pending"
    };    
    taskListArray = [...taskListArray, newTask];
    renderUI();
};

export function deleteTask(e) {
    const taskId = e.path[2].dataset.id; 
    taskListArray = taskListArray.filter((task) => task.id != taskId)
    renderUI()
};

export function checkBox(e) {
    const taskId = e.path[2].dataset.id;
    e.path[2].classList.toggle('completed');    
    const found = taskListArray.findIndex((index) => index.id == taskId);
    taskListArray[found].status === 'pending' ?
        taskListArray[found].status = 'completed' :
        taskListArray[found].status = 'pending'
};

export function clearTaskCompleted() {    
    taskListArray = taskListArray.filter((task) => task.status !== 'completed')
    renderUI()
}