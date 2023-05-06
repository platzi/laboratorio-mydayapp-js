import "./css/base.css";
import { sayHello, todos } from "./js/utils";

// const todos = [];

const main = document.querySelector(".main");
const footer = document.querySelector(".footer");

console.log(sayHello("Hello"));

function showInitialInfo() {
  if (!todos.length) {
    main.classList.add("hidden");
    footer.classList.add("hidden");
  }
}

showInitialInfo();
