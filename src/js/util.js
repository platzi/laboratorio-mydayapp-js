import { listTodo } from "./dataDom"
import { deleteItem, editData, getData, saveItems } from "./methods";
import { router } from "./router";

export function counterItem(total) {
    document.querySelector('strong').innerText = `${total}`
}

export function ocultMainAndFooter(data){

    const main = document.querySelector('.main');
    const footer = document.querySelector('.footer');

  
      if (data.length < 1) {
        main.classList += " ocult";
        footer.classList += " ocult";
        
      } else {
        main.classList.remove("ocult");
        footer.classList.remove("ocult");
      }

  }





export function loadData(data){
    listTodo(data);
    counterItem(data.length);
    ocultClear();
    ocultMainAndFooter(data);
 
  
}



export function ocultClear() {

    const data=JSON.parse(localStorage.getItem('mydayapp-js')) || [];

   const buttonClear=document.querySelector('.clear-completed')
   const completed=data.filter(ele=>ele.completed===true);

    if (completed.length < 1) {
        buttonClear.className += " ocult";
    } else {
        buttonClear.classList.remove("ocult");
    }

}


    

export function selectCompleted(elements, ele) {

    const { li, inputCheckbox} = elements;
    if (ele.completed) {
        li.className += "completed";
        inputCheckbox.setAttribute('checked', true);
    }


    inputCheckbox.addEventListener('change', () => {

        ele.completed = ele.completed ? false : true;
        inputCheckbox.toggleAttribute('checked');
        li.classList.toggle("completed");
        editData(ele); 
       setTimeout(router, 350)     
    })
   inputCheckbox.checked = ele.completed;
    
    

}