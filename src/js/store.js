const testingtask = [
  { id: 1, title: "Make a sandwich", completed: false },
  { id: 2, title: "print hello world", completed: false },
  { id: 3, title: "call mom", completed: true },
];
import { listGenerator, mf_control } from "./renderutilities";

class Store {
  constructor() {
    const dataChangeHandler = {
      get: (target, prop) => {
        return target[prop];
      },
      set: (target, prop, value) => {
        target[prop] = value;
        mf_control(this.data);
        listGenerator(this.data);
        return true;
      },
    };
    this.data = JSON.parse(localStorage.getItem("todo_list")) || [];
    this.dataproxy = new Proxy(this.data, dataChangeHandler);
  }
  addItem(title) {
    const new_task_id =
      this.data.length == 0 ? 1 : this.data[this.data.length - 1].id + 1;
    const new_task = {
      id: new_task_id,
      title: title,
      completed: false,
    };
    this.dataproxy.push(new_task);
    console.log(this.data);
  }
  saveList() {
    localStorage.setItem(JSON.stringify(this.data));
  }
}

export default Store;
