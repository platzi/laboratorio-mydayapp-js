
import "./css/base.css";
import { v4 as uuidv4 } from 'uuid';
import {ocultMainAndFooter, counterItem, saveItemLocalStorage, readItemsLocalStorage, listTodo} from './js/utils'






//input principal;
const inputPrincipal=document.querySelector('.new-todo');
inputPrincipal.autofocus;

//button clear completed
const buttonClear=document.querySelector('.clear-completed');


let items=[];
ocultMainAndFooter(items);
const dataStorage=readItemsLocalStorage();

if(dataStorage){
  items.push(...dataStorage);
}


inputPrincipal.addEventListener('change',(ele)=>{
    const title=ele.target.value.trim();
    const data={id:uuidv4(), title, completed:false};
    items.push({...data});
    counterItem(items.length); 
    saveItemLocalStorage(items)
    ocultMainAndFooter(items);  
    inputPrincipal.value="";
});




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




buttonClear.addEventListener('click',()=>{
  const todoList = document.querySelector('.todo-list');
  todoList.innerHTML = "";

 items= items.filter(ele=>{
    if(!ele.completed){
      return ele;
    }})


  saveItemLocalStorage(items);
  ocultMainAndFooter(items);
  counterItem(items.length);
 
})





















 






















{/* <li class="completed">
<div class="view">
  <input class="toggle" type="checkbox" checked />
  <label>Learn JavaScript</label>
  <button class="destroy"></button>
</div>
<input class="edit" value="Learn JavaScript" />
</li>


<li>
<div class="view">
  <input class="toggle" type="checkbox" />
  <label>Buy a unicorn</label>
  <button class="destroy"></button>
</div>
<input class="edit" value="Buy a unicorn" />
</li>


<li class="editing">
<div class="view">
  <input class="toggle" type="checkbox" />
  <label>Make dishes</label>
  <button class="destroy"></button>
</div>
<input class="edit" value="Make dishes" />
</li> */}