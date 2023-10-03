const list = document.querySelector('.todo-list');
export const sayHello = (text) => {
  console.log(list.childElementCount);
  return text;

};
// Funcion que crea el todo
function createTodo(){
  document.querySelector('.new-todo').addEventListener('keydown', (event)=>{
    // event.preventDefault();
    if(event.key == 'Enter' && event.target.value != ''){
      const word = event.target.value.trim();
      setTimeout(newTodo(word, false), 0)
      event.target.value = '';
      console.log('object');

    }
    // console.log(event.key);
  })
}
function newTodo(tarea, status){
const li = document.createElement('li');
  const todo = `
  <li class="${status ? 'completed' : ''}">
  <div class="view">
    <input class="toggle" type="checkbox"  />
    <label>${tarea}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="Learn JavaScript"  />
</li>
  `

  li.innerHTML = todo;
  document.querySelector('label').addEventListener('click', ()=>{
    alert('hola mundo');
  })
  list.appendChild(li)
}
function withoutTodo(){
  if(list.childElementCount < 1){
    document.querySelector('.main').remove();
    document.querySelector('.footer').remove();
  }
}

export function main(){
  createTodo()
  withoutTodo();

  // newTodo('Escribir poema', true);
  // newTodo('Hablar frances', false);

}
