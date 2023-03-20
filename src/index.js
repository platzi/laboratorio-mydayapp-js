import "./css/base.css";

import { navigation, showItems, showSections, hideSections, verifyCompletedItems, addItem, clearCompletedItem } from "./js/utils";

const local_store_key = 'mydayapp-js';
let toDoItems = navigation(local_store_key) || [];
const clearCompletedItemButton = document.querySelector(".clear-completed");

document.addEventListener("DOMContentLoaded", () => {
    if(toDoItems.length > 0) {
        showItems(toDoItems, local_store_key);
        showSections();
        verifyCompletedItems(toDoItems);
    } else {
        hideSections();
        clearCompletedItemButton.classList.add("hidden");
    }
});

window.addEventListener("hashchange", () => {
    toDoItems = navigation(local_store_key);
    if(toDoItems.length > 0) {
        showItems(toDoItems, local_store_key);
        showSections();
        verifyCompletedItems(toDoItems);
    } else {
        hideSections();
        clearCompletedItemButton.classList.add("hidden");
    }
});

document.querySelector(".new-todo").addEventListener("keyup", (event) => {
    if(event.key === "Enter" || event.keycode === 13){
        const title = event.target.value.trim();
        if(title.length > 0) {
            addItem(title, toDoItems, local_store_key);
        }
    }
});

clearCompletedItemButton.addEventListener("click", (event) => {
    const counter = toDoItems.filter((item) => item.completed).length;
    clearCompletedItem(counter, toDoItems, local_store_key);
    verifyCompletedItems(toDoItems);
});