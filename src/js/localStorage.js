export class TaskManager {
  saveTasks(tasks) {
    localStorage.setItem("mydayapp-js", JSON.stringify(tasks));
  }

  getTasks() {
    const tasks = JSON.parse(localStorage.getItem("mydayapp-js"));
    return tasks ? tasks : [];
  }

  addTask({ id, title, completed }) {
    const tasks = this.getTasks();
    const taskExists = tasks.find((task) => task.id === id);

    if (!taskExists) {
      const newTask = {
        id,
        title,
        completed,
      };

      tasks.push(newTask);
      this.saveTasks(tasks);
    }
  }

  deleteTask(id) {
    const tasks = this.getTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.saveTasks(tasks);
    }
  }

  updateTask(id, title) {
    const tasks = this.getTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks[index]["title"] = title;
      this.saveTasks(tasks);
    }
  }
}
