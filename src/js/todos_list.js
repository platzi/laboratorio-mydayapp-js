let listTodos = [];


const todos_list =  () => {

 
    if (localStorage.getItem("mydayapp-js")) {

         getTodo();
        
       
     }else{

        setTodos();
     }


     function setTodos(){
        localStorage.setItem("mydayapp-js" , JSON.stringify(listTodos))
     }

     function getTodo(){
        listTodos = JSON.parse(localStorage.getItem("mydayapp-js"))
     }


};


function pushTodo( tl, completed){

    let idtodo = 1000;
    if (listTodos.length === 0 ){
        idtodo = idtodo + 1
    }else{
        idtodo = listTodos[listTodos.length -1 ].id +1
    }
    

    listTodos.push({id:idtodo,title:tl, completed:completed})
    localStorage.setItem("mydayapp-js" , JSON.stringify(listTodos))

    
}




export {todos_list, pushTodo}

