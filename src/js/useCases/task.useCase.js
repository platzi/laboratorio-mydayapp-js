import task from "../entities/task.entitie";

class Task {
  addTask(taskList, title) {
    const newTask = new task(generateUniqueId(), title, false);
    taskList.push(newTask);
    return newTask;
  }
  chageState(taskList, id) {
    const taskIndex = taskList.findIndex((task) => {
      return task.id === id;
    });
    taskList[taskIndex].completed = taskList[taskIndex].completed
      ? false
      : true;
  }

  deleteTask(taskList, id) {
    const taskIndex = taskList.findIndex((task) => {
      return task.id === id;
    });
    taskList.splice(taskIndex, 1);
  }

  editTask(taskList, id, title) {
    const taskIndex = taskList.findIndex((task) => {
      return task.id === id;
    });
    taskList[taskIndex].title = title;
  }
}

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36);
}

export default Task;
