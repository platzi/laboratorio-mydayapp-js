import "./css/base.css";

import { sayHello, showSections, hideSections, addItem, addItemEvents } from "./js/utils";
//import { addItem } from "./js/helpers";

console.log(sayHello("Hello"));

const toDoItems = [];

document.addEventListener("DOMContentLoaded", (event) => {
    if(toDoItems.length > 0) {
        showSections();
    } else {
        hideSections();
    }
});

document.querySelector(".new-todo").addEventListener("keyup", (event) => {
    if(event.key === "Enter" || event.keycode === 13){
        const title = event.target.value.trim();
        if(title.length > 0) {
            addItem(title, toDoItems);
        }
    }
});