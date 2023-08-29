import "./css/base.css";

import * as Utils from "./js/utils";

console.log(Utils.sayHello("Hello"));

const mainInput = document.querySelector(".new-todo");
const clearButton = document.querySelector(".clear-completed");

mainInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (mainInput.value !== "") {
      const NewTask = new Task(mainInput.value.trim());
      Utils.SetTask(NewTask);
      mainInput.value = "";
    }
  }
});

clearButton.addEventListener("click", Utils.ClearCompletedTasks);

class Task {
  constructor(title) {
    (this.id = Math.floor(Math.random() * 100000)),
      (this.title = title),
      (this.completed = false);
  }
}

Utils.RenderTasks();
Utils.CountPendingTasks();
Utils.ToggleClearButton();
