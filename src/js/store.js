import { reRender } from "./renderSystem";
class Store {
  constructor() {
    const initState = JSON.parse(localStorage.getItem("todo_list")) || [];
    this.list = { data: initState };
    const dataHandler = {
      get: (target, prop) => {
        if (typeof target[prop] === "object" && target[prop] !== null) {
          return new Proxy(target[prop], dataHandler);
        } else {
          return target[prop];
        }
      },
      set: reRender,
    };
    this.listProxy = new Proxy(this.list, dataHandler);
  }
  addItem(title) {
    const new_task_id =
      this.list.data.length == 0
        ? 0
        : this.list.data[this.list.data.length - 1].id + 1;
    const new_task = {
      id: new_task_id,
      title: title,
      completed: false,
    };
    this.listProxy.data.push(new_task);
  }
  switchItemState(id) {
    const idIndex = this.listProxy.data.findIndex(
      (element) => element.id == id
    );
    this.listProxy.data[idIndex] = {
      ...this.listProxy.data[idIndex],
      completed: !this.listProxy.data[idIndex].completed,
    };
  }
  editItem(id, title) {
    const idIndex = this.listProxy.data.findIndex(
      (element) => element.id == id
    );
    this.listProxy.data[idIndex] = {
      ...this.listProxy.data[idIndex],
      title: title,
    };
  }
  cleanCompletes() {
    this.listProxy.data = this.listProxy.data.filter(
      (element) => element.completed == false
    );
  }
  saveList() {
    localStorage.setItem(JSON.stringify(this.list));
  }
}

export default Store;
