import "./css/base.css";

import { todoContainer, checkTaskNumber } from "./js/utils";

// const todoContainer = document.querysSelector("ul.todo-list");

window.addEventListener("load", checkTaskNumber);

const taskCountObserver = new MutationObserver(() => {
  checkTaskNumber();
});

taskCountObserver.observe(todoContainer, { childList: true });
