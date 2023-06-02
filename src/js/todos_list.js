import { showTodos } from "./showTodos";

const listTodos =  JSON.parse(localStorage.getItem("mydayapp-js")) || [];



function pushTodo( tl, completed){

    let idtodo = 1000;
    if (listTodos.length === 0 ){
        idtodo = idtodo + 1
    }else{
        idtodo = listTodos[listTodos.length -1 ].id +1
    }
    

    listTodos.push({id:idtodo,title:tl, completed:completed})
    setListTodos(listTodos);

    
}

function getListTodos(){
   

    return listTodos

}

function setListTodos(list){
    localStorage.setItem("mydayapp-js" , JSON.stringify(list))
    showTodos();
}



export { pushTodo, getListTodos, setListTodos}

