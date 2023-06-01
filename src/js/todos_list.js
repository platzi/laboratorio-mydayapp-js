let listTodos = [];


const todos_list =  () => {

 
    if (localStorage.getItem("todos")) {

         getTodo();
        
       
     }else{

        setTodos();
     }


     function setTodos(){
        localStorage.setItem("todos" , JSON.stringify(listTodos))
     }

     function getTodo(){
        listTodos = JSON.parse(localStorage.getItem("todos"))
     }


};


function addTodo( tl, completed){

    let idtodo = 1000;
    if (listTodos.length === 0 ){
        idtodo = idtodo + 1
    }else{
        idtodo = listTodos[listTodos.length -1 ].id +1
    }
    

    listTodos.push({id:idtodo,title:tl, completed:completed})
    localStorage.setItem("todos" , JSON.stringify(listTodos))

    
}

function getTodos(){
    return listTodos
}


export {todos_list, addTodo, getTodos}

