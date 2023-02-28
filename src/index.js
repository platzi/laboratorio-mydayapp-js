import {
  mainFooterDisplayValidator,
  generalTodoListGenerator,
} from "./js/utils";
import "./css/base.css";
import {
  clearCompleted,
  clearCompletedButtonValidator,
} from "./js/clearCompleted";
import { routeValidator } from "./js/routes-filter";

let todos = [];

const isMydayapp_js = JSON.parse(localStorage.getItem("mydayapp-js"));

if (!isMydayapp_js) localStorage.setItem("mydayapp-js", JSON.stringify(todos));

generalTodoListGenerator();
mainFooterDisplayValidator();
clearCompletedButtonValidator();
routeValidator();

// const saveTodosInLocalStorage = () => {
//   localStorage.setItem("mydayapp-js", JSON.stringify(todos));
// };

// const getTodosFromLocalStorage = () => {
//   todos = JSON.parse(localStorage.getItem("maydayapp-js"));
// };

const newTodoInput = document.querySelector(".new-todo");

let newUserInput = "";

newTodoInput.addEventListener("input", (e) => {
  const userInput = e.target.value.trim();
  newUserInput = userInput;
});

newTodoInput.addEventListener("keypress", (e) => {
  if (e.code === "Enter" || e.code === "NumpadEnter") {
    if (newUserInput.length < 1) return;
    todos = JSON.parse(localStorage.getItem("mydayapp-js"));
    todos?.push({ title: newUserInput, completed: false });
    localStorage.setItem("mydayapp-js", JSON.stringify(todos));
    generalTodoListGenerator();
    clearCompletedButtonValidator();

    e.target.value = "";
    newUserInput = "";
  }
  return;
});

const clearCompletedTarget = document.querySelector(".clear-completed");

clearCompletedTarget.addEventListener("click", () => {
  clearCompleted();
});

const pendingRouteTarget = document.querySelector(
  "ul.filters a[href='#/pending']"
);
pendingRouteTarget.addEventListener("click", () =>
  setTimeout(() => routeValidator(), 100)
);

const allRouteTarget = document.querySelector("ul.filters a[href='#/']");
allRouteTarget.addEventListener("click", () =>
  setTimeout(() => routeValidator(), 100)
);

const completedRouteTarget = document.querySelector(
  "ul.filters a[href='#/completed']"
);
completedRouteTarget.addEventListener("click", () =>
  setTimeout(() => routeValidator(), 100)
);

window.onhashchange = function () {
  routeValidator();
};
