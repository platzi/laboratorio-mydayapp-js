import { getListTodos, setListTodos } from "./todos_list";

const editTodoPlugin = () => {
  const listTodos = getListTodos();

  const htmlLabelsTodo = document.querySelectorAll(".view label");

  //para cada label agregamos un evento doble click
  htmlLabelsTodo.forEach((nodo) => {
    nodo.addEventListener("dblclick", () => {
      console.log("a");
      const parentElement = nodo.parentNode.parentNode;
      //solo si tiene vista view pasa al modo editing, un completado no se puede ditar
      if (
        parentElement.classList[0] === "view" ||
        parentElement.classList[1] === "view"
      ) {
        //antes de activar la vista de edicion verificamos si hay alguno en ese modo
        const editingNow = document.querySelectorAll(".editing");

        editingNow.forEach((node) => {
          //desactivamos el modo edicion para cualquier otro todo que no sea el actual
          node.classList.remove("editing");
          node.classList.add("view");
        });

        //ahora si ponemos nuestro todo en vista edicion
        parentElement.classList.remove("view");
        parentElement.classList.add("editing");

        //seleccionamos el input que se activi y hacemos focus
        document.querySelector(".editing .edit").focus();
      }
    });
  });

  // editar todo dando enter
  const htmlImputEdit = document.querySelectorAll(".view .edit");

  //agregamos el evento a todos los imputs
  htmlImputEdit.forEach((nodo) => {
    //evento para guardar con enter
    nodo.addEventListener("keyup", enterEvento);

    //evento para cancelar el modo edicion con escape
    nodo.addEventListener("keyup", escapeEvento);

    function escapeEvento(event) {
      if (event.code === "Escape") {
        //seleccionamos el todo que se esta editando
        const editingNow = document.querySelector(".editing");

        /*antes de salir guardamos el titulo que tenia antes
               asi si cambia el titulo y preciona escape
               la proxima vez aparece el titulo que estaba*/
        const title = document.querySelector(".editing label").textContent;

        //seleccionamos el imput que estamos editanto y le assignamos su valor inicial
        document.querySelector(".editing .edit").value = title;

        //salimos del modo edicion al modo vista
        editingNow.classList.add("view");
        editingNow.classList.remove("editing");

        setListTodos(listTodos);
        //eliminamos el evento despues de usarlo
        nodo.removeEventListener("keyup", escapeEvento);
      }
    }

    function enterEvento(event) {
      if (event.code === "Enter") {
        let title = nodo.value.trim();

        if (!(title === "" || null || undefined)) {
          const parentElement = nodo.parentNode;

          listTodos.find(
            (todo) => todo.id == parentElement.classList[0]
          ).title = title;

          parentElement.classList.remove("editing");
          parentElement.classList.add("view");

          setListTodos(listTodos);

          nodo.removeEventListener("keyup", enterEvento); // Elimina el listener del evento keyup
        }
      }
    }
  });

  //eliminar todo

  const htmlDestroyTodo = document.querySelectorAll(".destroy");
  //evento click para cada boton
  htmlDestroyTodo.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("a");
      //encontramos el padre principal
      const parentElement = btn.parentNode.parentNode;
      //encontramos el index del todo que tenga el id
      const index = listTodos.findIndex((todo) => {
        todo.id == parentElement.classList[1];
      });
      //quitamos el elemento de la lista
      listTodos.splice(index, 1);
      //actualizamos la lista en el localstorage
      setListTodos(listTodos);
    });
  });
};

export { editTodoPlugin };
