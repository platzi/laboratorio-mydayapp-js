import { TaskList } from "./model/task_list";

export class Controller {
  static KEY_LOCAL_STORAGE = "mydayapp-js";
  #taskList;
  constructor() {
    this.#initTasksList();
    this.#persist();
  }
  #initTasksList() {
    const rawData = localStorage.getItem(Controller.KEY_LOCAL_STORAGE);
    this.#taskList = new TaskList(rawData ? JSON.parse(rawData) : []);
  }
  #persist() {
    localStorage.setItem(
      Controller.KEY_LOCAL_STORAGE,
      JSON.stringify(this.#taskList.getList())
    );
  }
  thereAreTasks() {
    return this.#taskList.getList().length > 0;
  }
}
