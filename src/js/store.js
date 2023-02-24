import { reRender } from "./renderSystem";
class Store {
  constructor() {
    this.data = JSON.parse(localStorage.getItem("todo_list")) || [];
    const dataHandler = {
      get: (target, prop) => {
        return target[prop];
      },
      set: reRender,
    };
    this.dataProxy = new Proxy(this.data, dataHandler);
  }
  addItem(title) {
    const new_task_id =
      this.data.length == 0 ? 0 : this.data[this.data.length - 1].id + 1;
    const new_task = {
      id: new_task_id,
      title: title,
      completed: false,
    };
    this.dataProxy.push(new_task);
  }
  switchItemState(id) {
    const idIndex = this.dataProxy.findIndex((element) => element.id == id);
    this.dataProxy[idIndex] = {
      ...this.dataProxy[idIndex],
      completed: !this.dataProxy[idIndex].completed,
    };
  }
  editItem(id, title) {
    const idIndex = this.dataProxy.findIndex((element) => element.id == id);
    this.dataProxy[idIndex] = { ...this.dataProxy[idIndex], title: title };
  }
  saveList() {
    localStorage.setItem(JSON.stringify(this.data));
  }
}

export default Store;
