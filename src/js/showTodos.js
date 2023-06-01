import { getTodos } from "./todos_list";
import '../css/todos.css'


const showTodos = () => {

  //obtenemos los todos del localstorage para mostrarlos
const listTodos = getTodos(); 
    let view = /*html*/ `
`;

//por cada todo lo mostramos cambiando la classe dependiendo de si estacompletado
listTodos.map((item)=>{
    let clas;
    let ck;
if(item.completed){clas = "completed"; ck = "checked"}else{clas = "view"}
console.log(item.completed)

    view = view + `

    <li class=${clas}>
    <div class="view">
      <input class="toggle" type="checkbox" ${ck}/>
      <label>${item.title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value=${item.title} />
  </li>
    
    `
})

const htmlMenu = document.getElementById("main");
const htmlFooter = document.getElementById("footer");

if (listTodos.length === 0){
  htmlFooter.classList.add("hidden");
  htmlMenu.classList.add("hidden");
}

console.log(htmlMenu)
return view

    

};


export  {showTodos}