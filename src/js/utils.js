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
      let content = ``;
      const ul = document.querySelector('.todo-list');
      console.log(todo);
      todo.forEach(di => {
        TodosList.set(di.work, di);
        content +=  `
        <li class="${di.status ? 'completed' : ''}">
        <div class="view">
          <input class="toggle" type="checkbox" ${di.status ? 'checked' : ''} />
          <label>${di.work}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${di.work}" />
      </li>
        `
      })

      if(ul)
      ul.innerHTML = content;
      createEvents();
      withoutTodo();
      for(let li of ul?.children){
        editingWork(li);
      }
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
  <input class="edit" value="${work}"  />
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
  createEvents({work: work, status: status});
  withoutTodo();
  editingWork(li)
  uploadStorage();

  }
}
function withoutTodo(){
  document.querySelector('.todo-count').children[0].textContent = TodosList.size

  if(TodosList.size <= 0){
    document.querySelector('.main')?.classList.add('hidden');
    document.querySelector('.footer')?.classList.add('hidden');
  }else{
    document.querySelector('.main')?.classList.remove('hidden');
    document.querySelector('.footer')?.classList.remove('hidden');

  }
}
function createEvents(obj){
  document.querySelectorAll('.toggle').forEach(e => {
    e.addEventListener('click', ()=>{
      // e.classList
      if(e.parentNode?.parentNode){
      e.parentNode.parentNode.classList.toggle('completed');
      obj.status = !obj.status;
      TodosList.set(obj.work,obj);
      console.log(TodosList);
      uploadStorage()
      }

    });

  })
  document.querySelectorAll('.destroy').forEach(dest => {
    dest.addEventListener('click', (event)=>{
      TodosList.delete(event.target.parentNode.children[1].textContent)
      dest.parentNode.parentNode.remove()
      console.log(TodosList);
      uploadStorage()
      withoutTodo();

      // console.log(event.target.parentNode.children[1].textContent);
    })
  })

}
function clearboton(){
  document.querySelector('.clear-completed')?.addEventListener('click', ()=>{
    document.querySelectorAll('.completed').forEach(event => {
      TodosList.delete(event.children[0].children[1].textContent);
      event.remove()
      uploadStorage()


      withoutTodo();
    })
  })
}
function editingWork(element){
  element.children[0].addEventListener('dblclick', (event)=>{
    event.target.parentNode.parentNode.classList.add('editing');

  })
  element.children[1].addEventListener('keydown', (event)=>{
    if(event.key == 'Enter'){

      TodosList.set(element.children[1].value.trim(), {
        work: element.children[1].value.trim(),
      })
      element.children[0].children[1].textContent = element.children[1].value.trim();
      element.classList.remove('editing');
      uploadStorage();
    }
  })
}
function routes(){
  document.querySelector('.filters > li a[href="#/pending"]')?.addEventListener('click', (event)=>{
    event.stopPropagation();
    for(let chill of document.querySelectorAll('.todo-list li')){
      if(chill.classList.contains('completed')){
        chill.classList.add('hidden');
      }
      if(!chill.classList.contains('completed') &&  chill.classList.contains('hidden')){
        chill.classList.remove('hidden');

      }
    }

  })
  document.querySelector('.filters > li a[href="#/completed"]')?.addEventListener('click', (event)=>{
    event.stopPropagation();
    for(let list of document.querySelectorAll('.todo-list li')){
      if(!list.classList.contains('completed')){
        list.classList.add('hidden');
      }
      if(list.classList.contains('completed') && list.classList.contains('hidden')){
        list.classList.remove('hidden');

      }
    }
  })
  document.querySelector('.filters > li a[href="#/"]')?.addEventListener('click', (event)=>{
    event.stopPropagation();
    for(let list of document.querySelectorAll('.todo-list li') ){
      if(list.classList.contains('hidden')) list.classList.remove('hidden');
    }
  })
}
function uploadStorage(){
  window.localStorage.setItem('mydayapp-js', JSON.stringify(Array.from(TodosList.values())))
}
export function main(){
  createStorageData();
  createTodo();
  withoutTodo();
  clearboton();
  routes();

  // newTodo('Escribir poema', true);
  // newTodo('Hablar frances', false);

}

