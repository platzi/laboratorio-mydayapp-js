import "./css/base.css";
import * as node from "./js/nodes.js";

// main and footer should not be displayed when there's no todos
function checkTodoTask(element) {
  const childrenArray = Array.from(element.children);
  if (childrenArray.length > 0) {
    unhideMainAndFooter();
  } else {
    hideMainAndFooter();
  }
}

function hideMainAndFooter() {
  node.main.classList.add("hidden");
  node.footer.classList.add("hidden");
}

function unhideMainAndFooter() {
  node.main.classList.remove("hidden");
  node.footer.classList.remove("hidden");
}

checkTodoTask(node.todoList);
