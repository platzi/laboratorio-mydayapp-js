import "../css/todos.css";
import { checkPlugin } from "./checkPugin";
import { editTodoPlugin } from "./editTodoPlugin";
import { getListTodos } from "./todos_list";

const showTodos = (hash = "") => {
  //obtenemos los todos del localstorage para mostrarlos
  const listTodos = getListTodos();

  // ocultamos footer y main si no hay todos
  const htmlMenu = document.getElementById("main");
  const htmlFooter = document.getElementById("footer");

  if (listTodos.length === 0) {
    htmlFooter.classList.add("hidden");
    htmlMenu.classList.add("hidden");
  }

  //showtodos dependiendo del routing
  if (hash === "" || hash === "all") {
    printTodos(listTodos);
  } else if (hash === "pending") {
    let resultados = listTodos.filter(function (objeto) {
      return objeto.completed === false;
    });

    printTodos(resultados);
  } else if ((hash = "completed")) {
    let resultados = listTodos.filter(function (objeto) {
      return objeto.completed === true;
    });

    printTodos(resultados);
  }

  //funcion que imprime los todos
  function printTodos(list) {
    let view = ``;

    list.map((item) => {
      let clas;
      let ck;
      if (item.completed) {
        clas = "completed";
        ck = "checked";
      } else {
        clas = "view";
      }

      view =
        view +
        `

    <li class="${clas + " " + item.id}">
    <div class="view">
      <input class="toggle" type="checkbox" ${ck}/>
      <label>${item.title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value=${item.title} />
  </li>
    
    `;
    });

    //agregamos el html de los todo
    const htmlTodoList = document.querySelector(".todo-list");
    htmlTodoList.innerHTML = view;
  }

  //contamos los elementos que no estan completos
  const itemLeft = listTodos.filter((todo) => {
    return !todo.completed;
  }).length;

  const htmlItemLeft = document.querySelector(".todo-count");

  //insertamos el html al campo dependiendo la cantidad de pendientes
  if (itemLeft >= 2) {
    const view = `<strong>${itemLeft}</strong> items left`;
    htmlItemLeft.innerHTML = view;
  } else {
    const view = `<strong>${itemLeft}</strong> item left`;
    htmlItemLeft.innerHTML = view;
  }

  //Todo plugins
  // cuando se actualizan los todos tambien llamamos esta funcion que se encarga de marcar como completados
  checkPlugin();
  editTodoPlugin();
};

export { showTodos };
