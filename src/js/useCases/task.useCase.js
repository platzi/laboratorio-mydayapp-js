import task from "../entities/task.entitie"

class Task {
  addTask(taskList, title) {
    const newTask = new task(generateUniqueId(), title, "pending");
    taskList.push(newTask);
    return newTask;

  }

}

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36);
}

export default Task;
