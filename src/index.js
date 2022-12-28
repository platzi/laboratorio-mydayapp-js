
import "./css/base.css";
import { v4 as uuidv4 } from 'uuid';


import {ocultMainAndFooter, counterItem, saveItemLocalStorage, readItemsLocalStorage} from './js/utils'






//ocultar los elementos si estan vacios 



//input principal;
const inputPrincipal=document.querySelector('.new-todo');
inputPrincipal.autofocus;


/* {id:uuidv4(), title:'buy some cheese', complete:false},
{id:uuidv4(), title:'feed the cat', complete:false},
{id:uuidv4(), title:'book a doctors appointment', complete:false}, */

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