
import { dataUser } from "./js/createItem";
import { getData } from "./js/methods";
import { router } from "./js/router";



   

export function app(){
    const inputPrincipal=document.querySelector('.new-todo');
    inputPrincipal.autofocus; 
    dataUser();
    window.location="#/"
    window.addEventListener('load', (router))
    window.addEventListener('hashchange', router);




}



