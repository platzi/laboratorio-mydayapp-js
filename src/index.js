import "./css/base.css";
import { cargar, crear, editar, completar, filtrar, eliminar } from './js/utils.js';

/*#########################################################
            CARGAR INICIO DE LA APLICACION
#########################################################*/
window.onload = () => {
  if (localStorage.getItem("mydayapp-js")) cargar();
  else localStorage.setItem("mydayapp-js", JSON.stringify([]));
}

/*#########################################################
             ESCUCHA EVENTO CAMBIO DE NAVEGACION
#########################################################*/
window.onpopstate = () => {
  switch (location.hash) {
    case "#/":
      cargar();
      break;
    case "#/pending":
      cargar(false);
      break;
    case "#/completed":
      cargar(true);
      break;
    default:
      break;
  }
}

/*#########################################################
             ESCUCHA EVENTO CLICK
#########################################################*/
window.onclick = (event) => {
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
      break;
  }
}

/*#########################################################
             ESCUCHA EVENTO PRESIONAR TECLA
#########################################################*/
document.onkeyup = (event) => {
  crear(event);
}

/*#########################################################
             ESCUCHA EVENTO DOBLE CLICK
#########################################################*/
window.ondblclick = (event) => {
  editar(event);
}

