import { showTodos } from "./showTodos";



// agrega un toto al localstorage adema de asignar un id unico
function pushTodo( tl){
    const listTodos =  JSON.parse(localStorage.getItem("mydayapp-js")) || [];


    //agrega id despues de 1000 teniendo en cuenta los ids que ya estan en localstorage
    let idtodo = 1000;
    if (listTodos.length === 0 ){
        idtodo = idtodo + 1
    }else{
        idtodo = listTodos[listTodos.length -1 ].id +1
    }
    
    //siempre se agrega los todos como imcompletos
    listTodos.push({id:idtodo,title:tl, completed:false})
    setListTodos(listTodos);

    
}

// devolvemos la lista de todos

function getListTodos(){
    const listTodos =  JSON.parse(localStorage.getItem("mydayapp-js")) || [];

    return listTodos

}

//set la lista nueva de todos

function setListTodos(list){
    localStorage.setItem("mydayapp-js" , JSON.stringify(list))
    
    //esto hace que cuando se agrege un todo se actualice la vista
    showTodos();
}



export { pushTodo, getListTodos, setListTodos}

