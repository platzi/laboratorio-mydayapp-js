import { getListTodos, setListTodos } from "./todos_list";

const clearCompleted=()=>{


    //eliminar completados
    const htmlClrCompleted = document.querySelector(".clear-completed")
    
    htmlClrCompleted.addEventListener("click",()=>{
        //obtenemos la lista de todos actual
        const listTodos = getListTodos();

        //filtramos los incompletos y los guardamos
        let resultados = listTodos.filter(function(objeto) {
            return objeto.completed === false;
          });

        //guardamos esta nueva lista con los incompletos
        setListTodos(resultados);
         
     })
}

export {clearCompleted}
