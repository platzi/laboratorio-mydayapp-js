export function getTasks() {
    const data = localStorage.getItem('mydayapp-js')
    return JSON.parse(data) || [];
}

export function setTask(task) {
    const data = getTasks();
    data.push(task);
    localStorage.setItem('mydayapp-js', JSON.stringify(data));
}

export function removeTask(task) {
    const data = JSON.parse(localStorage.getItem('mydayapp-js'));
    const itemRemoved = data.filter((item) => item.id !== task.id);
    localStorage.setItem('mydayapp-js', JSON.stringify(itemRemoved));
}