import { getTodos } from "./todos_list";

const showTodos = () => {

const listTodos = getTodos(); 


    let view = /*html*/ `


`;

listTodos.map((item)=>{
    view = view + `

    <li>
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label>Buy a unicorn</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Buy a unicorn" />
  </li>
    
    `
})


return view

    

};


export  {showTodos}