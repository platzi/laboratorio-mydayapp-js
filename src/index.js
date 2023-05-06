import "./css/base.css";

import { cargar, crear, completar, filtrar, eliminar } from './js/utils.js';

/*#########################################################
            CARGAR INICIO DE LA APLICACION
#########################################################*/
window.onload = () => {
  if (localStorage.getItem("todo")) {
    cargar();
  } else {
    localStorage.setItem("todo", JSON.stringify([]));
  }
}

/*#########################################################
             ESCUCHA EVENTO PRESIONAR TECLA
#########################################################*/
window.onkeypress = function (event, index) {
  crear(event);
}

/*#########################################################
             ESCUCHA EVENTO CLICK
#########################################################*/
window.onclick = function (event, index) {
  switch (event.target.localName) {
    case "input":
      completar(event);
      break;
    case "a":
      filtrar(event);
      break;
    case "button":
      eliminar(event);
      break;
    default:
      console.log("evento no programado");
      break;
  }
}

/*#########################################################
             ESCUCHA EVENTO DOBLE CLICK
#########################################################*/
window.ondblclick = function (event) {
  // console.log("double");
}

