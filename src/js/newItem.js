import { counter } from "./counter";
import { todoList } from "..";
import { btnClearCompletedVisible } from "./btnClearCompletedVisible";

export function newItem() {
  // verificación de tareas pendientes
  btnClearCompletedVisible()
  // Limpieza de los contenedores
  const ul = document.querySelector(".todo-list");
  ul.innerHTML = "";
  let newTodo = document.querySelector(".new-todo");
  newTodo.value = "";

  //ocular main y footer hasta agregar un archivo
  const main = document.querySelector(".main");
  const footer = document.querySelector(".footer");

  if (todoList.length != 0) {
    main.classList.remove("hidden");
    footer.classList.remove("hidden");
  } else {
    main.classList.add("hidden");
    footer.classList.add("hidden");
  }
  //iteración por cada elemento para hacer render
  todoList.forEach(item => {
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

    //agregando atributos a los inputs
    div.classList.add("view");
    input.classList.add("toggle");
    input.setAttribute("type", "checkbox");

    if (item.completed === true) {
      input.checked = true
      li.classList.add("completed");

    }
    if (item.visible === false) {
      div.classList.add("hidden");
    } else if (item.visible === true) {
      div.classList.remove("hidden");
    }

    // toggle chackbox
    input.addEventListener('click', () => {
      if (input.checked) {
        li.classList.add("completed");
        item.completed = true;
        localStorage.setItem('mydayapp-js', JSON.stringify(todoList))
        btnClearCompletedVisible()
      } else {
        li.classList.remove("completed");
        item.completed = false;
        localStorage.setItem('mydayapp-js', JSON.stringify(todoList))
        btnClearCompletedVisible()

      }
    })
    //Escuchar eventos  de doble click y cambio de estado 
    label.ondblclick = function () {
      if (this.checked) {
        li.classList.remove("completed");
        li.classList.add("editing");
        input2.focus().trim()
      } else if (!this.checked) {
        li.classList.add("editing");
        input2.focus()

      } else {
        li.classList.remove("editing");
      }

    }
    // Escuchador de eventos para guardar y renderizar los cambios realizardos
    input2.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        item.tarea = input2.value
        input2.parentNode.classList.remove('editing');
        label.innerHTML = "";
        label.append(input2.value)
        localStorage.setItem('mydayapp-js', JSON.stringify(todoList))
      } else if (e.code === "Escape") {
        input2.value = item.tarea;
        input2.parentNode.classList.remove('editing');
      }
    });

    //eliminación de todo en el Btn destroy
    btn.classList.add("destroy");
    btn.addEventListener('click', () => {
      const findIndex = todoList.findIndex(element => element === item);
      todoList.splice(findIndex, 1)
      localStorage.setItem('mydayapp-js', JSON.stringify(todoList))
      newItem()
    })

    //isercion de los elementos creados en el HTML
    ul.appendChild(li);
    li.appendChild(div);
    li.appendChild(input2);
    label.append(input2.value);
    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(btn);
  })

  counter()
}