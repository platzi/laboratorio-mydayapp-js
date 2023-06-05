import { getListTodos, setListTodos } from "./todos_list";

const footerPlugins = () => {
  //hacer qeu cambie el boton seleccionado segun corresponda
  var filterLinks = document.querySelectorAll(".filters a");

  filterLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Quita la clase "selected" de todos los enlaces
      filterLinks.forEach((link) => {
        link.classList.remove("selected");
      });

      // Establece la clase "selected" en el enlace actual
      link.classList.add("selected");
    });
  });

  // evento de eliminar completados

  //eliminar completados
  const htmlClrCompleted = document.querySelector(".clear-completed");

  htmlClrCompleted.addEventListener("click", () => {
    //obtenemos la lista de todos actual
    const listTodos = getListTodos();

    //filtramos los incompletos y los guardamos
    let resultados = listTodos.filter(function (objeto) {
      return objeto.completed === false;
    });

    //guardamos esta nueva lista con los incompletos
    setListTodos(resultados);
  });
};

export { footerPlugins };
