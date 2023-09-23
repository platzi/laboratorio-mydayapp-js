export const sayHello = (text) => {
  return text;
};

export const validarListaTareas = () => {
  const main = document.querySelector("#main");
  const footer = document.querySelector("#footer");

  const contenedorTareas = document.getElementsByClassName("todo-list");
  const tareas = contenedorTareas[0].children;

  if (tareas.length == 0) {
    main.classList.add("inactive");
    footer.classList.add("inactive");
  } else {
    main.classList.remove("inactive");
    footer.classList.remove("inactive");
  }
};
export const listernerCheckboxComplete = () => {
  const checkboxCompletedList = document.querySelectorAll(".toggle");
  checkboxCompletedList.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      const checkboxPadre = checkbox.parentNode.parentNode;
      checkboxPadre.classList.toggle("completed");
    });
  });
};

export const listennerDobleClick = () => {
  const editTareaList = document.querySelectorAll(".nombre-tarea");
  editTareaList.forEach((tarea) => {
    tarea.addEventListener("dblclick", () => {
      const contenedorTarea = tarea.parentNode.parentNode;
      contenedorTarea.classList.toggle("editing");
      const edicion = contenedorTarea.querySelector(".edit");
      const end = edicion.value.length;
      edicion.setSelectionRange(end, end);
      edicion.focus();
    });
  });
};
