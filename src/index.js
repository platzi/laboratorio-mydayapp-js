import "./css/base.css";

import { sayHello, showSections, hideSections } from "./js/utils";

console.log(sayHello("Hello"));

const toDoItems = ["hola"];

document.addEventListener("DOMContentLoaded", (event) => {
    if(toDoItems.length > 0) {
        showSections();
    } else {
        hideSections();
    }
} )