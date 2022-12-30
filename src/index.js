
import "./css/base.css";
import { app } from "./app";

app();

const a=document.querySelectorAll('a');


a.forEach(el=>{
  
  el.addEventListener('click',()=>{
    
  const selected=document.querySelector('.selected');
    selected.classList.remove('selected');
    el.classList.add('selected');
 
    
    
    
  })
})
