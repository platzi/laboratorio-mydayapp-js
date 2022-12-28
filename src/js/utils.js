



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


    inputCheckbox.addEventListener('change', ()=>{

      inputCheckbox.toggleAttribute('checked');
      li.classList.toggle("completed")


      
  /*     if(inputCheckbox.checked){
        li.className+="completed"

      }else{
        li.classList.remove('completed')
      }  */

    })

   /*  if(inputCheckbox.checked){
      li.className+=" completed"
    } */

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






