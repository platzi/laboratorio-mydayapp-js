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
  #persist() {
    localStorage.setItem(
      Controller.KEY_LOCAL_STORAGE,
      JSON.stringify(this.#taskList.getList())
    );
  }
  #createInstanceTask(rawTask) {
    return new Task(rawTask.id, rawTask.title, rawTask.completed);
  }
  addTask({ title, completed = true }) {
    this.#taskList.pushTask(new Task(crypto.randomUUID(), title, completed));
    this.#persist();
  }
  getTasks() {
    return this.#taskList.getList();
  }
  thereAreTasks() {
    return this.#taskList.getList().length > 0;
  }
}
