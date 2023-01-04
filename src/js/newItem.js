import { check } from "prettier";

export function newItem(text) {
  let newTodo = document.querySelector(".new-todo");
  newTodo.value = "";
  const main = document.querySelector(".main");
  const footer = document.querySelector(".footer");
  main.classList.remove("hidden");
  footer.classList.remove("hidden");

  const ul = document.querySelector(".todo-list");
  const li = document.createElement("li");
  const div = document.createElement("div");
  const input = document.createElement("input");
  const input2 = document.createElement("input");
  const label = document.createElement("label");
  const btn = document.createElement("button");
  const newText = text.trim();

  if (newText.length != 0) {

    div.classList.add("view");
    input.classList.add("toggle");
    input.setAttribute("type", "checkbox")
    input2.classList.add("edit");
    input2.value = newText;
    btn.classList.add("destroy");

    ul.appendChild(li);
    li.appendChild(div);
    li.appendChild(input2);
    label.append(newText)
    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(btn);
  } else {
    alert("Write something")
  }


}