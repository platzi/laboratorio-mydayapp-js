import { showTodos } from "./showTodos";
import { pushTodo, todos_list } from "./todos_list";


const addTodo = ()=>{

const htmlInputAddTodo = document.querySelector(".new-todo");
const htmlMenu = document.getElementById("main");
const htmlFooter = document.getElementById("footer");

htmlInputAddTodo.addEventListener("keyup" , (event)=>{
    if (event.code === "Enter"){
        
    let title =  htmlInputAddTodo.value.trim()

        if(!(title ==="" || null || undefined)){

            htmlInputAddTodo.value = "";
            todos_list();
            pushTodo(title, false);
        
        
            htmlFooter.classList.remove("hidden");
            htmlMenu.classList.remove("hidden");
        
            console.log(title)
        
            
            showTodos();
        }
        
   
    }
})

}

export {addTodo}