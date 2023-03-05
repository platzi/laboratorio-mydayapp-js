import "./css/base.css";

import { todoContainer, checkTaskNumber, addTodo } from "./js/utils";

// MutationObserver -> To check Task number

window.addEventListener("load", checkTaskNumber);

const taskCountObserver = new MutationObserver(() => {
  checkTaskNumber();
});

taskCountObserver.observe(todoContainer, { childList: true });

// Event listener for add new Task when keypress Enter

document.addEventListener("keydown", function (event) {
  const input = document.activeElement;
  if (event.key === "Enter") {
    if (
      input.className === "new-todo" &&
      input.type === "text" &&
      input.value.trim() !== ""
    ) {
      addTodo(input.value);
      input.value = "";
    }
  }
});
