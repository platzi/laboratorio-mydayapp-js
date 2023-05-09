/*#########################################################
            FUNCIONES PRINCIPALES
#########################################################*/
export function cargar(filter = undefined) {
  limpiar();
  setfilters(filter);
  let list = JSON.parse(localStorage.getItem("mydayapp-js"));
  const subject = document.querySelector(".todo-list");
  list.filter(e => filter != undefined ? e.completed == filter : e).reverse().forEach((element, index) => {
    subject.insertAdjacentHTML(
      "afterbegin",
      ` <li id="${list.length - index - 1}" class="${element.editing ? "editing" : element.completed ? "completed" : ""}">
        <div class="view">
          <input id="${list.length - index - 1}" ${checkbox(element.completed)} class="toggle" type="checkbox"/>
           <label id="${list.length - index - 1}">${element.title}</label>
    <button class="destroy" id="${list.length - index - 1}"></button>
        </div>
      <input id="${list.length - index - 1}" class="edit" value='${element.title}'/>
      </li > `
    );
  });

  document.querySelector("#count").insertAdjacentHTML(
    "afterbegin",
    list.length
  );
  document.querySelector("#count").insertAdjacentHTML(
    "beforeend",
    list.length > 1 ? " items left" : " item left"
  );
  if (list.length == 0) {
    document.querySelector(".main").style.display = "none";
    document.querySelector(".footer").style.display = "none";
  } else {
    document.querySelector(".main").style.display = "block";
    document.querySelector(".footer").style.display = "block";
  }

  document.querySelector(".clear-completed").style.display = list.filter(e => e.completed == true).length > 0 ? "block" : "none";
};
export function crear(e) {
  if (e.keyCode === 13 && !e.shiftKey) {
    e.preventDefault();
    let list = JSON.parse(localStorage.getItem("mydayapp-js"));
    if (e.target.id) {
      list[e.target.id].title = e.target.value.trim()
      list[e.target.id].editing = !list[e.target.id].editing;
    } else {
      const subject = document.querySelector(".todo-list");
      list.push(
        {
          title: e.target.value.trim(),
          completed: false,
          editing: false
        }
      );
    }
    document.querySelector(".new-todo").value = '';
    localStorage.setItem("mydayapp-js", JSON.stringify(list));
    cargar();
  }
  if (e.keyCode === 27) {
    let list = JSON.parse(localStorage.getItem("mydayapp-js"));
    list[e.target.id].editing = !list[e.target.id].editing;
    localStorage.setItem("mydayapp-js", JSON.stringify(list));
    document.querySelector(".new-todo").value = '';
    cargar();
  }

};
export function completar(e) {
  if (e.target.id) {
    let list = JSON.parse(localStorage.getItem("mydayapp-js"));
    if (!list[e.target.id].editing) {
      list[e.target.id].completed = !list[e.target.id].completed;
      localStorage.setItem("mydayapp-js", JSON.stringify(list));
      cargar();
    }
  }
};
export function filtrar(e) {
  switch (e.target.hash) {
    case "#/":
      cargar();
      break;
    case "#/pending":
      cargar(false);
      break;
    case "#/completed":
      cargar(true);
      break;
    default:
      break;
  }

};
export function eliminar(e) {
  if (e.target.className == "destroy") {
    let list = JSON.parse(localStorage.getItem("mydayapp-js"));
    list.splice(e.target.id, 1);
    localStorage.setItem("mydayapp-js", JSON.stringify(list));
  } else {
    limpiarCompletados();
  }
  cargar();
};
export function limpiarCompletados() {
  let list = JSON.parse(localStorage.getItem("mydayapp-js"));
  localStorage.setItem("mydayapp-js", JSON.stringify(list.filter(todo => todo.completed == false)));
};
export function editar(e) {
  let list = JSON.parse(localStorage.getItem("mydayapp-js"));
  if (list[e.target.id].editing) list[e.target.id].title = e.target.value.trim()
  list[e.target.id].editing = !list[e.target.id].editing;
  localStorage.setItem("mydayapp-js", JSON.stringify(list));
  cargar();
  const input = document.querySelector(`input[id='` + e.target.id + `'][class='edit']`);
  input.selectionStart = input.selectionEnd = input.value.length;
  input.focus();
};
const limpiar = () => {
  document.querySelector(".todo-list").innerHTML = "";
  document.querySelector("#count").innerHTML = "";
};
const setfilters = (filter) => {
  document.querySelector(".filters").innerHTML = "";
  const subject = document.querySelector(".filters");
  switch (filter) {
    case undefined:
      subject.insertAdjacentHTML(
        "afterbegin",
        ` <li>
            <a href="#/" class="selected">All</a>
          </li>
          <li>
            <a href="#/pending">Pending</a>
          </li>
          <li>
            <a href="#/completed">Completed</a>
          </li> `
      );
      break;
    case false:
      subject.insertAdjacentHTML(
        "afterbegin",
        ` <li>
      <a href="#/" >All</a>
    </li>
    <li>
      <a href="#/pending" class="selected">Pending</a>
    </li>
    <li>
      <a href="#/completed">Completed</a>
    </li>`
      );
      break;
    case true:
      subject.insertAdjacentHTML(
        "afterbegin",
        `<li>
      <a href="#/">All</a>
    </li>
    <li>
      <a href="#/pending">Pending</a>
    </li>
    <li>
      <a href="#/completed" class="selected">Completed</a>
    </li>`
      );
      break;
    default:
      break;
  }



};
const checkbox = (completed) => { return completed ? 'checked' : '' };
