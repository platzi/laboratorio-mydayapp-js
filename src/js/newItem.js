import { todoList } from "..";
import { counter } from "./counter";

export function newItem(text) {

  let newTodo = document.querySelector(".new-todo");
  newTodo.value = "";

  //ocular main y footer hasta agregar un archivo
  const main = document.querySelector(".main");
  const footer = document.querySelector(".footer");
  main.classList.remove("hidden");
  footer.classList.remove("hidden");

  //creación de elementos HTML
  const ul = document.querySelector(".todo-list");
  const li = document.createElement("li");
  const div = document.createElement("div");
  const input = document.createElement("input");
  let input2 = document.createElement("input");
  const label = document.createElement("label");
  const btn = document.createElement("button");
  const newText = text.trim();

  //implementacición del editor de inputs
  input2.classList.add("edit");
  input2.value = newText;
  input2.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      input2.value = input2.value;
      input2.parentNode.classList.remove('editing');
      label.innerHTML = "";
      label.append(input2.value.trim())
    } else if (e.code === "Escape") {
      input2.value = newText;
      input2.parentNode.classList.remove('editing');
    }
  });


  todoList.push({
    tarea: newText,
    completed: false,
  });
  //console.log(todoList)

  //validación de contenido vacio
  if (newText.length != 0) {

    //agregando atributos a los inputs
    div.classList.add("view");
    input.classList.add("toggle");
    input.setAttribute("type", "checkbox");

    //Escuchar eventos  de doble click y cambio de estado en el checkbox
    input.onchange = function () {
      if (this.checked) {
        li.classList.add("completed");
      } else {
        li.classList.remove("completed");
      }
    }
    label.ondblclick = function () {
      if (this.checked) {
        li.classList.remove("completed");
        li.classList.add("editing");
        input2.focus()
      } else if (!this.checked) {
        li.classList.add("editing");
        input2.focus()

      } else {
        li.classList.remove("editing");
      }

    }

    btn.classList.add("destroy");

    //isercion de los elementos creados en el HTML
    ul.appendChild(li);
    li.appendChild(div);
    li.appendChild(input2);
    label.append(input2.value);
    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(btn);
  } else {
    alert("Write something")
  }

  counter()
}