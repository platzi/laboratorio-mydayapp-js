import { showTodos } from "./showTodos"
import { getListTodos, setListTodos } from "./todos_list";

const checkPlugin =()=>{
    const listTodos =  getListTodos(); 

    // funcion de completed para los toTos

const htmlcheck = document.querySelectorAll(".toggle")

//recorremos los togles de los toDos
htmlcheck.forEach((node)=>{
  
  //agregamos una funcion que detecta el cambio a cada nodo
  node.addEventListener("change", (a)=>{

   
    //cuando detecta un cambio guarda el padre del nodo
    const parentElement = node.parentNode.parentNode

    //si es checked cambiamos las clases segun corresponda y actualizamos los estados del todo
   if(node.checked){
    parentElement.classList.remove("view")
    parentElement.classList.add("completed")

    //buscamos el todo correspondiente y actualizamos su estado
    listTodos.find(todo=>todo.id == parentElement.classList[0]).completed = true

   }else{
    parentElement.classList.remove("completed")
    parentElement.classList.add("view")

    listTodos.find(todo=>todo.id == parentElement.classList[0]).completed = false

   }

   // llamamos la funcion que setea los todos en el localstorage para que se actualicen
   setListTodos(listTodos);

  

  })

  

})

}


export {checkPlugin}