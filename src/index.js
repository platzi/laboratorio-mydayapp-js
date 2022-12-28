
import "./css/base.css";
import { v4 as uuidv4 } from 'uuid';
import {ocultMainAndFooter, counterItem, saveItemLocalStorage, readItemsLocalStorage, listTodo } from './js/utils'
import { router } from "./js/router";


let items=[];



//input principal;
const inputPrincipal=document.querySelector('.new-todo');
inputPrincipal.autofocus;

//button clear completed
const buttonClear=document.querySelector('.clear-completed');



ocultMainAndFooter(items);
const dataStorage=readItemsLocalStorage();

if(dataStorage){
  items.push(...dataStorage);
}





inputPrincipal.addEventListener('change',(ele)=>{
  

    items=readItemsLocalStorage();
    const title=ele.target.value.trim();
    const data={id:uuidv4(), title, completed:false};
    items.push({...data});
    counterItem(items.length); 
    saveItemLocalStorage(items)
    ocultMainAndFooter(items);  
    inputPrincipal.value="";
    
});







//completedIsEmpty


buttonClear.addEventListener('click',()=>{
  const todoList = document.querySelector('.todo-list');
  todoList.innerHTML = "";
 items=items.filter(ele=>{
    if(!ele.completed){
      return ele;
    }})

  saveItemLocalStorage(items);
  ocultMainAndFooter(items);
  counterItem(items.length);
 
})

export function ocultClear(items){
  
  const completed=[];

  items.forEach(ele=>{
    if(ele.completed){
        completed.push(ele);
    }
  })

  if(completed.length<1){
      buttonClear.className+=" ocult";
  }else{
    buttonClear.classList.remove("ocult");
  }
}



window.addEventListener('hashchange', ()=>{
  router(items);
})








 



    
    

  











//redirection

/* const redirection=()=>{
  const pending=document.querySelector('#pending');
  const selectedAll=document.querySelector('.selected');
  const completed=document.querySelector('#completed');
  
  selectedAll.addEventListener('click',()=>{
    listTodo(items);
    counterItem(items.length); 
  })
  
  
  
  
  pending.addEventListener('click',()=>{
  
    const itemPendding=items.filter(ele=>{
      if(!ele.completed){
        return ele;
      }
    })
  
    listTodo(itemPendding);
    counterItem(itemPendding.length);
  })
  
  
  completed.addEventListener('click',()=>{
  
    const itemCompleted=items.filter(ele=>{
      if(ele.completed){
        return ele;
      }
    })
  
    listTodo(itemCompleted);
    counterItem(itemCompleted.length);
  })
  
} */

