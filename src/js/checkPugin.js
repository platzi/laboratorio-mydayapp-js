import { showTodos } from "./showTodos"
import { getListTodos, setListTodos } from "./todos_list";

const checkPlugin =()=>{
    const listTodos =  getListTodos(); 

    // funcion de completed para todos los todos

const htmlcheck = document.querySelectorAll(".toggle")

htmlcheck.forEach((node)=>{
  
  node.addEventListener("change", (a)=>{

    console.log("chamge")

    //cuando detecta un cambio guarda el padre del nodo
    const parentElement = node.parentNode.parentNode

    //si es checked cambiamos las clases segun corresponda y actualizamos los estados del todo
   if(node.checked){
    parentElement.classList.remove("view")
    parentElement.classList.add("completed")

    listTodos.find(todo=>todo.id == parentElement.classList[0]).completed = true

   }else{
    parentElement.classList.remove("completed")
    parentElement.classList.add("view")

    listTodos.find(todo=>todo.id == parentElement.classList[0]).completed = false

   }
   
   setListTodos(listTodos);

  

  })

  

})

}


export {checkPlugin}