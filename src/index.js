import "./css/base.css";

import * as Utils from "./js/utils";

console.log(Utils.sayHello("Hello"));

const mainInput = document.querySelector(".new-todo");

mainInput.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    if (mainInput.value !== "") {
      const NewTask = new Task(mainInput.value.trim());
      Utils.SetTask(NewTask);
      mainInput.value = "";
    }
  }
});

class Task {
  constructor(title) {
    (this.id = this.SetID()), (this.title = title), (this.completed = false);
  }

  SetID() {
    const Tasks = Utils.GetTasks();

    const MaxID = Object.keys(Tasks).length;
    return MaxID + 1;
  }

  ToggleState() {
    this.completed = this.completed !== true;
  }
}

Utils.RenderTasks();
