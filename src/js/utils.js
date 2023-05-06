const checkbox = (status) => { return status == "completed" ? 'checked' : '' }
const limpiar = () => {
  document.querySelector(".todo-list").innerHTML = "";
  document.querySelector("#count").innerHTML = "";
};

/*#########################################################
            FUNCIONES PRINCIPALES
#########################################################*/
export function cargar(filter = undefined) {
  limpiar();
  let list = JSON.parse(localStorage.getItem("todo"));
  const subject = document.querySelector(".todo-list");
  list.filter(e => filter != undefined ? e.status == filter : e).forEach((element, index) => {
    subject.insertAdjacentHTML(
      "afterbegin",
      ` <li class="${element.status}">
        <div class="view">
          <input id="${index}" ${checkbox(element.status)} class="toggle" type="checkbox"/>
           <label> ${element.title}</label>
    <button class="destroy" id="${index}"></button>
        </div >
      <input class="edit" value="Learn JavaScript" />
      </li > `
    );
  });
  document.querySelector("#count").insertAdjacentHTML(
    "afterbegin",
    list.length
  );
}
export function crear(e) {
  if (e.keyCode === 13 && !e.shiftKey) {
    e.preventDefault();
    let list = JSON.parse(localStorage.getItem("todo"));
    list.push(
      {
        title: e.target.value,
        status: "pending"
      }
    );
    document.querySelector(".new-todo").value = '';
    localStorage.setItem("todo", JSON.stringify(list));
  }
  cargar();
};
export function completar(e) {
  if (e.target.id) {
    let list = JSON.parse(localStorage.getItem("todo"));
    list[e.target.id].status = list[e.target.id].status == "completed" ? "pending" : "completed";
    localStorage.setItem("todo", JSON.stringify(list));
    cargar();
  }
};
export function filtrar(e) {
  switch (e.target.hash) {
    case "#/":
      cargar();
      break;
    case "#/pending":
      cargar("pending");
      break;
    case "#/completed":
      cargar("completed");
      break;
    default:
      break;
  }

}
export function eliminar(e) {
  if (e.target.className == "destroy") {
    let list = JSON.parse(localStorage.getItem("todo"));
    list.splice(e.target.id, 1);
    localStorage.setItem("todo", JSON.stringify(list));
  } else {
    limpiarCompletados();
  }
  cargar();
};
export function limpiarCompletados() {
  let list = JSON.parse(localStorage.getItem("todo"));
  localStorage.setItem("todo", JSON.stringify(list.filter(todo => todo.status != "completed")));
}

