// @ts-check
const TodosList = new Map();
const list = document.querySelector('.todo-list');
export const sayHello = (text) => {
  if(list)
  console.log(list.childElementCount);
  return text;

};
function createStorageData(){
  window.addEventListener('load', ()=>{
    if(window.localStorage.getItem('mydayapp-js')){
      const todo = (JSON.parse(String(window.localStorage.getItem('mydayapp-js'))));
      console.log('todo' + {todo});
      let content = ``;
      const ul = document.querySelector('.todo-list');
      console.log(todo.length);
      console.log(todo);
      console.log(content);
      todo.forEach(di => {
        TodosList.set(di.work, di);
        content +=  `
        <li class="${di.status ? 'completed' : ''}">
        <div class="view">
          <input class="toggle" type="checkbox" ${di.status ? 'checked' : ''} />
          <label>${di.work}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="Learn JavaScript" />
      </li>
        `
      })

      if(ul)
      ul.innerHTML = content;
      createEvents();
      withoutTodo();
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
  createEvents();
  withoutTodo();
  window.localStorage.setItem('mydayapp-js', JSON.stringify(Array.from(TodosList.values())))

  }
}
function withoutTodo(){
  console.log('size' + TodosList.size);
  if(TodosList.size <= 0){
    document.querySelector('.main')?.classList.add('hidden');
    document.querySelector('.footer')?.classList.add('hidden');
  }else{
    document.querySelector('.main')?.classList.remove('hidden');
    document.querySelector('.footer')?.classList.remove('hidden');

  }
}
function createEvents(){
  document.querySelectorAll('.toggle').forEach(e => {
    e.addEventListener('click', ()=>{
      // e.classList
      if(e.parentNode?.parentNode)
      e.parentNode.parentNode.classList.toggle('completed');

    });

  })
  document.querySelectorAll('.destroy').forEach(dest => {
    dest.addEventListener('click', (event)=>{
      TodosList.delete(event.target.parentNode.children[1].textContent)
      dest.parentNode.parentNode.remove()
      console.log(TodosList);
      window.localStorage.setItem('mydayapp-js', JSON.stringify(Array.from(TodosList.values())))
      withoutTodo();

      // console.log(event.target.parentNode.children[1].textContent);
    })
  })

}

export function main(){
  createStorageData();
  createTodo()
  withoutTodo();


  // newTodo('Escribir poema', true);
  // newTodo('Hablar frances', false);

}

