import "./css/base.css";

import { sayHello, showSections, hideSections, createItem } from "./js/utils";
import { addItem } from "./js/helpers";

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
        const element = event.target;
        const title = element.value.trim();
        if(title.length > 0) {
            const item = createItem(title);
            toDoItems.push(item);
            addItem(item);
            element.value = null;
            showSections();
            console.log(toDoItems);
        }
    }
});