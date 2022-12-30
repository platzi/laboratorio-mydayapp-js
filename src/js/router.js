import { listTodo } from "./dataDom";
import { getData } from "./methods";
import { counterItem, loadData, ocultClear } from "./util";





export function router(){

  const {hash}=window.location;
  const content=contentRoute(hash);

  loadContent(content);
  
  
  }
  

  function contentRoute(hash){

    



    const items=getData();
    let itemsContent;


    if(!hash ||hash =='#/'){
      itemsContent=items;
    }
    
    if(hash =='#/pending'){  
     itemsContent=items.filter(ele=>!ele.completed);
    }
    

    
    if(hash =='#/completed'){
       itemsContent=items.filter(ele=>{
        if(ele.completed){
          return ele;
        }
      }) 
      
    }

    return itemsContent;

  }


  function loadContent(data){
    listTodo(data);
    counterItem(data.length);
    ocultClear();
  }


  