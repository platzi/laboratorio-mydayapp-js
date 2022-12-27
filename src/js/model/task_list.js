export class TaskList {
  #taskList;
  constructor(taskList = []) {
    this.#taskList = taskList;
  }
  addTask(task) {
    this.#taskList.push(task);
  }
  #filterTaskByStatus(completed) {
    return this.#taskList.filter((tl) => tl.isCompleted() === completed);
  }
  getCompletedTasks() {
    return this.#filterTaskByStatus(true);
  }
  getPendingTasks() {
    return this.#filterTaskByStatus(false);
  }
  getList() {
    return this.#taskList;
  }
}
