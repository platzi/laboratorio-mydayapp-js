
import '../css/todos.css'


const showTodos = () => {

  //obtenemos los todos del localstorage para mostrarlos
const listTodos =  JSON.parse(localStorage.getItem("mydayapp-js")) || []; 
    let view = /*html*/ `
`;

//por cada todo lo mostramos cambiando la classe dependiendo de si estacompletado
listTodos.map((item)=>{
    let clas;
    let ck;
if(item.completed){clas = "completed"; ck = "checked"}else{clas = "view"}


    view = view + `

    <li class="${clas +" "+ item.id}">
    <div class="view">
      <input class="toggle" type="checkbox" ${ck}/>
      <label>${item.title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value=${item.title} />
  </li>
    
    `
})

// ocultamos footer y main si no hay todos
const htmlMenu = document.getElementById("main");
const htmlFooter = document.getElementById("footer");

if (listTodos.length === 0){
  htmlFooter.classList.add("hidden");
  htmlMenu.classList.add("hidden");
}

//agregamos el html de los todo
const htmlTodoList = document.querySelector(".todo-list")
htmlTodoList.innerHTML = view;


//contamos los elementos que no estan completos
const itemLeft = listTodos.filter((todo)=>{
  return !todo.completed
}).length

const htmlItemLeft = document.querySelector(".todo-count");

//insertamos el html al campo dependiendo la cantidad de pendientes
if(itemLeft >= 2 ){
  const view = `<strong>${itemLeft}</strong> items left`;
  htmlItemLeft.innerHTML = view;
}else{
  const view = `<strong>${itemLeft}</strong> item left`;
  htmlItemLeft.innerHTML = view;
}


// funcion de completed para todos los todos

const htmlcheck = document.querySelectorAll(".toggle")

htmlcheck.forEach((node)=>{
  
  node.addEventListener("change", (a)=>{

    //cuando detecta un cambio guarda el padre del nodo
    const parentElement = node.parentNode.parentNode

    //si es checked cambiamos las clases segun corresponda 
   if(node.checked){
    parentElement.classList.remove("view")
    parentElement.classList.add("completed")
    console.log(parentElement.classList)
   }else{
    parentElement.classList.remove("completed")
    parentElement.classList.add("view")
   }


  })
  

})



};


export  {showTodos}