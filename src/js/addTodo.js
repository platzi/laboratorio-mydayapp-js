import { pushTodo } from "./todos_list";

//funcion para agregar todos a la lista
const addTodo = () => {
  const htmlInputAddTodo = document.querySelector(".new-todo");
  const htmlMenu = document.getElementById("main");
  const htmlFooter = document.getElementById("footer");

  //evento para detectar el enter
  htmlInputAddTodo.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
      //borramoslos espacios al imput
      let title = htmlInputAddTodo.value.trim();

      //si no esta vacio agregamos un todo a la lista de todos
      if (!(title === "" || null || undefined)) {
        htmlInputAddTodo.value = "";

        //agregamos el todo con su informacion
        pushTodo(title);

        // mostramos los nodos ocultos
        htmlFooter.classList.remove("hidden");
        htmlMenu.classList.remove("hidden");
      }
    }
  });
};

export { addTodo };
