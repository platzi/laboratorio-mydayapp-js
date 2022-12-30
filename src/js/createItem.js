import { saveItems } from "./methods";
import { v4 as uuidv4 } from 'uuid'
import { router } from "./router";

export function dataUser(){
    const inputPrincipal=document.querySelector('.new-todo');
    inputPrincipal.autofocus;

    inputPrincipal.addEventListener('change', (ele)=>{
        const title=ele.target.value.trim();
        const item=[];
        const data={id:uuidv4(), title, completed:false};
        ele.target.value="";
        item.push(data);
        saveItems(item);
        router();
    });

}