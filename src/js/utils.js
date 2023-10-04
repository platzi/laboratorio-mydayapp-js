const TodosList = new Map();
const list = document.querySelector('.todo-list');
export const sayHello = (text) => {
  console.log(list.childElementCount);
  return text;

};
function createStorageData(){
  window.addEventListener('load', ()=>{
    if(window.localStorage.key('mydayapp-js')){
      const Todos = (JSON.parse(String(window.localStorage.getItem('mydayapp-js'))));
      console.log(Todos);
      Todos.forEach(todo => newTodo(todo.work));
    }else{
      console.log('without localstorage');
    }
  })
}
// Funcion que crea el todo
function createTodo(){
  document.querySelector('.new-todo').addEventListener('keydown', (event)=>{
    // event.preventDefault();
    if(event.key == 'Enter' && event.target.value != ''){
      const word = event.target.value.trim();
      setTimeout(newTodo(word, false), 0)
      event.target.value = '';

    }
    // console.log(event.key);
  })
}
function newTodo(work, status = false){
  return ()=>{
    const li = document.createElement('li');
  const todo = `
  <div class="view">
    <input class="toggle" type="checkbox"  />
    <label>${work}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="Learn JavaScript"  />
  `
  if(status){
    li.classList.toggle('completed')
  }
  li.innerHTML = todo;
    TodosList.set(work, {
      work: work,
      status: status
    })



  console.log(TodosList);
  list.appendChild(li);
  document.querySelectorAll('.toggle').forEach(e => {
    e.addEventListener('click', ()=>{
      // e.classList
      e.parentNode.parentNode.classList.toggle('completed');
      status = !status;

    });

  })
  document.querySelectorAll('.destroy').forEach(dest => {
    dest.addEventListener('click', (event)=>{
      TodosList.delete(event.target.parentNode.children[1].textContent)
      dest.parentNode.parentNode.remove()
      console.log(TodosList);
      window.localStorage.setItem('mydayapp-js', JSON.stringify(Array.from(TodosList.values())))

      // console.log(event.target.parentNode.children[1].textContent);
    })
  })
  window.localStorage.setItem('mydayapp-js', JSON.stringify(Array.from(TodosList.values())))

  }
}
function withoutTodo(){
  if(list.childElementCount < 1){
    document.querySelector('.main').remove();
    document.querySelector('.footer').remove();
  }
}


export function main(){
  createStorageData();
  createTodo()
  withoutTodo();


  // newTodo('Escribir poema', true);
  // newTodo('Hablar frances', false);

}

