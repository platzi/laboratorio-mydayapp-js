import "./css/base.css";

// import { sayHello } from "./js/utils";
//#1 Ocultar las secciones main y footer
const main = document.querySelector("#main");
const footer = document.querySelector("#footer");

const contenedorTareas = document.getElementsByClassName("todo-list");
const tareas = contenedorTareas[0].children;

if (tareas.length == 0) {
  main.classList.add("inactive");
  footer.classList.add("inactive");
} else {
  main.classList.remove("inactive");
  footer.classList.remove("inactive");
}
