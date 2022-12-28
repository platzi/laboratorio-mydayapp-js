
export const listTodo = (items) => {
  const todoList = document.querySelector('.todo-list');
  todoList.innerHTML = " ";
  items.forEach(ele => {

    //Creación de elementos
    const li = document.createElement('li');

    todoList.append(li);
    const divView = document.createElement('div');
    divView.className += "view";
    li.append(divView);

    const inputCheckbox = document.createElement('input');
    inputCheckbox.className += "toggle";
    inputCheckbox.type = "checkbox";


    if(ele.completed){
        li.className+="completed";
        inputCheckbox.setAttribute('checked', true);
    }


    inputCheckbox.addEventListener('change', ()=>{
      ele.completed=ele.completed?false:true;
      saveItemLocalStorage(items);
        inputCheckbox.toggleAttribute('checked');
        li.classList.toggle("completed");
  

    })

  

    inputCheckbox.checked=ele.completed;

    const label = document.createElement('label');
    label.innerText = `${ele.title}`;

    const buttonDestroy = document.createElement('button');
    buttonDestroy.className += "destroy";

    divView.append(inputCheckbox, label, buttonDestroy);

    //Creación al momento de click para editar;
    const inputEdit = document.createElement('input');
    inputEdit.className += "edit";
    li.append(inputEdit);
  })
}

export const counterItem=(total)=>{
    document.querySelector('strong').innerText=`${total}`
}


export const saveItemLocalStorage=(items)=>{
  localStorage.setItem("mydayapp-js", JSON.stringify(items));
}


export const readItemsLocalStorage=()=>{
  const items=JSON.parse(localStorage.getItem('mydayapp-js'));

  if(items){
    listTodo(items);
    ocultMainAndFooter(items);
    counterItem(items.length);
    
    return items;
  }




}



export const ocultMainAndFooter = (items) => {
  const main = document.querySelector('.main');
  const footer = document.querySelector('.footer');
  if (items.length < 1) {
    main.classList += " ocult";
    footer.classList += " ocult";
  } else {
    main.classList.remove("ocult");
    footer.classList.remove("ocult");
    listTodo(items);
  }

}






