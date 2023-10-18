export default class TaskList {
  constructor(arrayTasks = []) {
    this._taskList = [];
    if (arrayTasks.length >= 1) arrayTasks.map((task) => this.addTask(task));
  }
  addTask(task) {
    this._taskList.push(task);
  }
  deleteTask(id) {
    this._taskList = this._taskList.filter((task) => task.id != id);
  }
  clearCompletedTask() {
    this._taskList = this._taskList.filter((task) => !task.completed);
  }
  getTaskById(id) {
    return this._taskList.filter((task) => task.id == id)[0];
  }
  getNextID() {
    return String(this._taskList.length + 1);
  }
  getAllTasks() {
    return this._taskList;
  }
  getPendingTasks() {
    return this._taskList.filter((task) => !task.completed);
  }
  getCompletedTasks() {
    return this._taskList.filter((task) => task.completed);
  }
  getFilteredTasks(title) {
    let filteredTask = this._taskList.filter((task) => {
      let taskTitle = task.title.toUpperCase();
      return taskTitle.includes(title.toUpperCase());
    });
    return filteredTask;
  }
}
