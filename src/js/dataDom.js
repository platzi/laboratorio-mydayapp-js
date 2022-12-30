import { deleteItem, editData, getData } from "./methods";
import { selectCompleted } from "./util";

export function listTodo(items){
    const todoList = document.querySelector('.todo-list');
    todoList.innerHTML = " ";
    items.forEach(ele => {
  
      const li = document.createElement('li');
      todoList.append(li);
      const divView = document.createElement('div');
      divView.className += "view";
      li.append(divView);
  
      const inputCheckbox = document.createElement('input');
      inputCheckbox.className += "toggle";
      inputCheckbox.type = "checkbox";

      const elements={li, inputCheckbox};
   
      selectCompleted(elements, ele);
      
    
      const label = document.createElement('label');
      label.innerText = `${ele.title}`;
  
      const buttonDestroy = document.createElement('button');
      buttonDestroy.className += "destroy";
  
      divView.append(inputCheckbox, label, buttonDestroy);


      const inputEdit = document.createElement('input');
      inputEdit.className += "edit";
      inputEdit.autofocus; 
      li.append(inputEdit);
      

        label.addEventListener('click',()=>{
            
            divView.className+=" ocult";
            inputEdit.style="display:block";
            inputEdit.value=ele.title;
          

            inputEdit.addEventListener('keydown',(event)=>{

               if(event.key==="Enter"){
                inputEdit.style="display:none";
                divView.classList.remove("ocult");
                ele.title=inputEdit.value.trim()
                editData(ele);
                getData();
               }

               if(event.key==="Escape"){
                inputEdit.style="display:none";
                divView.classList.remove("ocult");
               }
            })
        })



      buttonDestroy.addEventListener('click', ()=>{
          deleteItem(ele)
    })
  
    })



    const buttonClear=document.querySelector('.clear-completed');
      buttonClear.addEventListener('click', async()=>{
        const data=getData()
        const completed=data.filter(ele=> ele.completed === true);
        

        completed.forEach(ele=>{
            deleteItem(ele);
        })

        
 
})


}

