import { getListTodos, setListTodos } from "./todos_list";

const editTodoPlugin = ()=>{

    const listTodos = getListTodos();

    const htmlLabelsTodo = document.querySelectorAll(".view label");

//para cada label agregamos un evento doble click
    htmlLabelsTodo.forEach((nodo)=>{
        nodo.addEventListener("dblclick", ()=>{

            const parentElement = nodo.parentNode.parentNode
         //solo si tiene vista view pasa al modo editing, un completado no se puede ditar
            if(parentElement.classList[0]=== "view" || parentElement.classList[1] === "view" )
            {  
               

              //antes de activar la vista de edicion verificamos si hay alguno en ese modo
               const editingNow = document.querySelectorAll(".editing")
                
               editingNow.forEach((node)=>{
                //desactivamos el modo edicion para cualquier otro todo que no sea el actual
               node.classList.remove("editing")
               node.classList.add("view")
                
               })

                           
               //ahora si ponemos nuestro todo en vista edicion
               parentElement.classList.remove("view")
               parentElement.classList.add("editing")

               //seleccionamos el input que se activi y hacemos focus
               document.querySelector(".editing .edit").focus();
            }
        })
    })


    // editar todo dando enter
    const htmlImputEdit = document.querySelectorAll(".view .edit");

    //agregamos el evento a todos los imputs 
    htmlImputEdit.forEach((nodo)=>{
     
        nodo.addEventListener("keyup" , (event)=>{
            if (event.code === "Enter"){
                
                //borramoslos espacios al imput
                let title = nodo.value.trim()
                                
                //si es un titulo valido entonces actualizamos los todos
                if(!(title ==="" || null || undefined)){

                    const parentElement = nodo.parentNode
                    
                    // encontramos el todo con el id  al que hicimos click
                    // y le asignamos el nuevo titulo
                    listTodos.find(todo=>todo.id == parentElement.classList[0]).title = title;
                    
                    //quitamos el modo edicion
                    parentElement.classList.remove("editing")
                    parentElement.classList.add("view")

                    //guardamos en localstorage
                    setListTodos(listTodos);
                   
                }           
            }
        })


        //cancelar el modo edicion con escape
        nodo.addEventListener("keyup" , (event)=>{
            if (event.code === "Escape"){
                 //seleccionamos el todo que se esta editando 
                const editingNow = document.querySelector(".editing")

             
                //antes de salir guardamos el titulo que tenia antes
                //asi si cambia el titulo y preciona escape
                //la proxima vez aparece el titulo que estaba
                const title = document.querySelector(".editing label").textContent
           
                //seleccionamos el imput que estamos editanto y le assignamos su valor inicial
                document.querySelector(".editing .edit").value = title

                //salimos del modo edicion al modo vista
                editingNow.classList.add("view");
                editingNow.classList.remove("editing");
                    
                
                

            }
        })


        
    })

}

export {editTodoPlugin}