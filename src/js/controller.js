import { TaskList } from "./model/task_list";
import { Task } from "./model/task";

export class Controller {
  static KEY_LOCAL_STORAGE = "mydayapp-js";
  #taskList;
  constructor() {
    this.#initTasksList();
    this.#persist();
  }
  #initTasksList() {
    const rawData = localStorage.getItem(Controller.KEY_LOCAL_STORAGE);
    this.#taskList = new TaskList(
      rawData ? JSON.parse(rawData).map(this.#createInstanceTask) : []
    );
  }
  async #persist() {
    localStorage.setItem(
      Controller.KEY_LOCAL_STORAGE,
      JSON.stringify(this.#taskList.getList())
    );
  }
  #createInstanceTask(rawTask) {
    return new Task(rawTask.id, rawTask.title, rawTask.completed);
  }
  findTaskById(idTask) {
    return this.getTasks().find((t) => t.id === idTask);
  }
  findIndexTaskById(idTask) {
    return this.getTasks().findIndex((t) => t.id === idTask);
  }
  addTask({ title, completed = true }) {
    this.#taskList.pushTask(new Task(crypto.randomUUID(), title, completed));
    this.#persist();
  }
  updateTitleTask(idTask, title) {
    let indexTask = this.findIndexTaskById(idTask);
    let task = this.getTasks()[indexTask];
    task.title = title;
    this.getTasks()[indexTask] = task;
    this.#persist();
  }
  toggleStatusTask(idTask) {
    let task = this.findTaskById(idTask);
    task.isCompleted() ? task.markAsPending() : task.markAsCompleted();
    this.#persist();
  }
  getTasks() {
    return this.#taskList.getList();
  }
  getTaskList() {
    return this.#taskList;
  }
  thereAreTasks() {
    return this.#taskList.getList().length > 0;
  }
}
