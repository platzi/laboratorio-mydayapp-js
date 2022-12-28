import { ocultClear } from "..";
import { counterItem, listTodo } from "./utils";

export function router(items){
    ocultClear(items);
    const {hash}=location;

     if(!hash || hash =='#/pending'){
       const buttonclear=document.querySelector('.clear-completed');
       buttonclear.className+= " ocult";

      const itemPendding=items.filter(ele=>{
        if(!ele.completed){
          return ele;
        }
      })


      listTodo(itemPendding);
      counterItem(itemPendding.length);
    }
  

    if(hash =='#/'){
      listTodo(items);
      counterItem(items.length);
    }
    

    if(!hash || hash =='#/completed'){
        const itemPCompleted=items.filter(ele=>{
          if(ele.completed){
            return ele;
          }
        })
  
  
        listTodo(itemPCompleted);
        counterItem(itemPCompleted.length);
      }
    
  
  }
  
