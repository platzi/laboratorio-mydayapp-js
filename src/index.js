import "./css/base.css";

import * as Utils from "./js/utils";

console.log(Utils.sayHello("Hello"));

const mainInput = document.querySelector(".new-todo");

mainInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
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
    const TasksList = Utils.GetTasks();
    return TasksList.length;
  }

  ToggleState() {
    this.completed = this.completed !== true;
  }
}

Utils.RenderTasks();
Utils.CountPendingTasks();
