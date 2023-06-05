import "./css/base.css";
import { addTodo } from "./js/addTodo";
import { footerPlugins } from "./js/footerPlugins";
import router from "./js/route";





//manejo de rutas
document.addEventListener("DOMContentLoaded", router)
window.addEventListener("hashchange",router)


//plugins de una sola carga
addTodo();
footerPlugins();