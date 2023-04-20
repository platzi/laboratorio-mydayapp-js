import { listTaks } from "..";
import { addTasks } from "./addTasks.js";
import { counter } from "./counter";

export function btnClearCompleted() {
  const btnClearCompleted = document.querySelector(".clear-completed");
  const li_all = document.querySelectorAll(".todo-list li");

  btnClearCompleted.addEventListener("click", () => {
    listTaks.forEach((task, index) => {
      if (task.completed) {
        listTaks.splice(index, 1);
      }
    });
    localStorage.setItem("mydayapp-js", JSON.stringify(listTaks));

    addTasks(listTaks);
    counter();
    btnClearCompleted.classList.add("inactive");
  });

  const hasCompletedTasks = Array.from(li_all).some((li) =>
    li.classList.contains("completed")
  );

  if (hasCompletedTasks) {
    btnClearCompleted.classList.remove("inactive");
  } else {
    btnClearCompleted.classList.add("inactive");
  }

  // console.log(hasCompletedTasks);
  // console.log(listTaks);
}
