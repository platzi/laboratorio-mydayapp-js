import "./css/base.css";

import { todoList } from "./js/todoList";

console.log(todoList)

const mainSection = document.querySelector(".main")
const footerSection = document.querySelector(".footer")

if (todoList.length === 0) {
    mainSection.style.display = "none"
    footerSection.style.display = "none"
}