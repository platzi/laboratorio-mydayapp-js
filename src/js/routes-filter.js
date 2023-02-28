const pendingRouteTarget = document.querySelector(
  "ul.filters a[href='#/pending']"
);

const allRouteTarget = document.querySelector("ul.filters a[href='#/']");

const completedRouteTarget = document.querySelector(
  "ul.filters a[href='#/completed']"
);

import { todoCounterGenerator } from "./counter";
import { createNewTodo, generalTodoListGenerator } from "./utils";

export const routeValidator = () => {
  const route = window.location.hash;
  const mainTarget = document.querySelector(".main");
  mainTarget.style.display = "block";

  const footerTarget = document.querySelector(".footer");
  footerTarget.style.display = "block";

  const todoListTarget = document.querySelector(".todo-list");
  todoListTarget.innerHTML = "";

  if (route === "#/pending") {
    const todos = JSON.parse(localStorage.getItem("mydayapp-js")).filter(
      (item) => !item.completed
    );
    todos?.forEach((item, index) => {
      todoListTarget.append(createNewTodo(item.title, index, todos));
    });

    pendingRouteTarget.classList = "selected";
    allRouteTarget.classList.remove("selected");
    completedRouteTarget.classList.remove("selected");
  } else if (route === "#/completed") {
    const todos = JSON.parse(localStorage.getItem("mydayapp-js")).filter(
      (item) => item.completed
    );
    todos?.forEach((item, index) => {
      todoListTarget.append(createNewTodo(item.title, index, todos));
    });

    pendingRouteTarget.classList.remove("selected");
    allRouteTarget.classList.remove("selected");
    completedRouteTarget.classList = "selected";
  } else if (route === "#/all" || route === "#/" || route === "") {
    generalTodoListGenerator();
    pendingRouteTarget.classList.remove("selected");
    allRouteTarget.classList = "selected";
    completedRouteTarget.classList.remove("selected");
  }
  todoCounterGenerator();
};
