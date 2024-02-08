import "./css/base.css";

const footer = document.querySelector("footer");
const list = document.querySelector(".todo-list");
const main = document.querySelector(".main");

console.log(footer);
console.log(list);

if (list.childElementCount === 0) {
  footer.style.display = "none";
  main.style.display = "none";
}
