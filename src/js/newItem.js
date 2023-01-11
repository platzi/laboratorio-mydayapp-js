import { counter } from "./counter";
import { todoList } from "..";

export function newItem() {
  //LocalStorage
  // if (location.hash.startsWith('#/')) {
  // }

  //const todoList = JSON.parse(localStorage.getItem("mydayapp-js"));

  //pendiente
  // let itemCompleted = todoList.filter(item => item.completed);
  // console.log("itemCompleted", itemCompleted);


  const ul = document.querySelector(".todo-list");
  ul.innerHTML = "";
  let newTodo = document.querySelector(".new-todo");
  newTodo.value = "";
  // const newText = text.trim();

  //ocular main y footer hasta agregar un archivo
  const main = document.querySelector(".main");
  const footer = document.querySelector(".footer");
  main.classList.remove("hidden");
  footer.classList.remove("hidden");

  todoList.forEach(item => {
    //console.log("todoListitemmmm", item);

    //creación de elementos HTML
    const li = document.createElement("li");
    const div = document.createElement("div");
    const input = document.createElement("input");
    let input2 = document.createElement("input");
    const label = document.createElement("label");
    const btn = document.createElement("button");

    //implementacición del editor de inputs
    input2.classList.add("edit");
    input2.value = item.tarea;

    input2.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        //input2.value = input2.value;
        item.tarea = input2.value.trim()
        input2.parentNode.classList.remove('editing');
        label.innerHTML = "";
        label.append(input2.value.trim())

        localStorage.setItem('mydayapp-js', JSON.stringify(todoList))
      } else if (e.code === "Escape") {
        input2.value = item.tarea;
        input2.parentNode.classList.remove('editing');
      }
    });

    //validación de contenido vacio
    // if (newText.length != 0) {

    //agregando atributos a los inputs
    div.classList.add("view");
    input.classList.add("toggle");
    input.setAttribute("type", "checkbox");

    // if (isCheked === true) {
    //   li.classList.add("completed");
    //   input.checked = true;
    // }

    if (item.completed === true) {
      input.checked = true
      li.classList.add("completed");

    }
    if (item.visible === false) {
      div.classList.add("hidden");
    } else if (item.visible === true) {
      div.classList.remove("hidden");
    }


    //Escuchar eventos  de doble click y cambio de estado en el checkbox
    input.addEventListener('click', () => {
      if (input.checked) {
        li.classList.add("completed");
        item.completed = true;
        localStorage.setItem('mydayapp-js', JSON.stringify(todoList))
        console.log('input', item.completed);
      } else {
        li.classList.remove("completed");
        item.completed = false;
        localStorage.setItem('mydayapp-js', JSON.stringify(todoList))
        console.log('input2', item.completed);
      }
    })
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
    // } else {
    //   alert("Write something")
    // }
    //console.log(todoList);
  })








  counter(0)
}