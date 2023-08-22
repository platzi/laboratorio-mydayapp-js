import * as nodos from './nodos.js'

function haveTask() {
  if (!localStorage.getItem('mydayapp-js') || localStorage.getItem('mydayapp-js') == '[]') {
    nodos.main.setAttribute('style', 'display:none');
    nodos.footer.setAttribute('style', 'display:none');
  } else {
    let Tasklist = JSON.parse(localStorage.getItem('mydayapp-js'));
    Tasklist.forEach(task => {
      // cargo todas las tareas que haya en el LS
      insertTaskinList(task, nodos.ulMain);

    });
  }
};
//--------------------------------------------------------------------------------
function createId() {
  let id;
  let taskListInLS = localStorage.getItem('mydayapp-js') ? JSON.parse(localStorage.getItem('mydayapp-js')) : [];
  if (!taskListInLS) {
    id = 1
  } else {
    id = taskListInLS.length + 1;
    console.log(taskListInLS);
  } return id;
}
//--------------------------------------------------------------------------------
function getTask(tarea) {
  let tasklist = JSON.parse(localStorage.getItem('mydayapp-js'));
  let task = tasklist.find(task => task.title == tarea.title);
  return task
  //sin uso aun.
};
//--------------------------------------------------------------------------------
function editTask(tarea, item, value) {
  console.log(tarea, item, value)
  let tasklist = JSON.parse(localStorage.getItem('mydayapp-js'));
  console.log('lo que hay en ls')
  console.log(tasklist)
  let changedTaskArray = tasklist.map(function (task) {
    if (task && task.title == tarea.title || task && task.id == tarea.id) {
      if (value === true || value === false) {
        task = {
          ...tarea,
          'completed': value
        }
        console.log('tarea cambiada')
        console.log(task)
        return task
      } else if (item === 'title') {
        task = {
          ...tarea,
          'title': value
        };
        return task
      }
      // } else if (!task) {
      //   task = { 'completed': true, 'title': 'toDisable' };
      //   return task
      // }// trabajo atajando la posibilidad de que haya un error
    }
  });
  console.log('array que contiene tarea cambiada')
  console.log(changedTaskArray)
  let changedTask = changedTaskArray[tarea.id - 1];
  tasklist = tasklist.filter(task => task != null || task != undefined)
  // if (tasklist.length == 1) {
  //   tasklist[0] = changedTask
  // } else {
  // tasklist[tarea.id - 1] = changedTask;
  // };
  tasklist[tarea.id - 1] = changedTask
  //aca depurar array tasklist
  console.log('array final')
  console.log(tasklist)
  let tasklistForLS = JSON.stringify(tasklist.filter(task => task != null || task != undefined))
  console.log('array mas final que el final')
  console.log(tasklistForLS)
  // 
  localStorage.setItem('mydayapp-js', tasklistForLS)
}
//-------------------------------------------------------------------------------
function createTask(tarea) {
  console.log('lo de arriba es la tarea')
  //llega un objeto
  console.log(localStorage.getItem('mydayapp-js'))
  let tasklist = localStorage.getItem('mydayapp-js') ? JSON.parse(localStorage.getItem('mydayapp-js')) : [];
  console.log('que viene')
  console.log(tasklist)
  if (tasklist) {
    tasklist.push(tarea)
  }
  let tasklistForLS = JSON.stringify(tasklist);
  localStorage.setItem('mydayapp-js', tasklistForLS)

  if (tasklist.length == 1) {
    location.reload();// si es la primer tarea, refreco pagina para que se vea la tarea recien creada
  }
};

//--------------------------------------------------------------------------------
function filterTask(boolean) {
  let tasklist = localStorage.getItem('mydayapp-js') ? JSON.parse(localStorage.getItem('mydayapp-js')) : [];
  let completed = [];
  let pending = [];
  tasklist.filter(function (task) {
    if (!task) {
      task = { 'completed': true, 'title': 'toDisable' };
      completed[completed.length] = task
      console.log(completed);
      //uso para atajar posibles errores
    } else if (task.completed === true) {
      completed[completed.length] = task
      console.log(completed);
    } else {
      pending[pending.length] = task
      console.log(pending);
    }
  }); console.log(localStorage.getItem('mydayapp-js'))
  if (boolean) {
    return completed
  } else {
    return pending
  }




}
//--------------------------------------------------------------------------------
function clearCompleted() {
  let onlyPending = filterTask(false);
  let onlyPendingLS = JSON.stringify(onlyPending);
  console.log(onlyPending)
  localStorage.setItem('mydayapp-js', onlyPendingLS)
}
//--------------------------------------------------------------------------------
function showPendingShurkut() {
  let pending = filterTask(false);
  const strongForCount = document.createElement('strong')
  nodos.countSpan.innerHTML = '';
  if (pending.length == 1) {
    strongForCount.innerHTML = `${pending.length} item pending`
  } else {
    strongForCount.innerHTML = `${pending.length} items pending`
  }
  nodos.countSpan.appendChild(strongForCount);
}
//--------------------------------------------------------------------------------
function showTaskForHash() {
  let query = `${location.hash}`
  if (query == '#/') {
    let tasklist = JSON.parse(localStorage.getItem('mydayapp-js'));
    console.log(tasklist)
    tasklist.map(task => insertTaskinList(task, nodos.ulMain));
    nodos.hashAllBtn.classList.add('selected')
    nodos.hashPendingBtn.classList.remove('selected')
    nodos.hashcompletedBtn.classList.remove('selected')
  } else if (query == '#/pending') {
    let pending = filterTask(false);
    console.log('estos son los pending')
    console.log(pending)
    pending.map(task => insertTaskinList(task, nodos.ulMain))
    nodos.hashAllBtn.classList.remove('selected')
    nodos.hashPendingBtn.classList.add('selected')
    nodos.hashcompletedBtn.classList.remove('selected')
  } else if (query == '#/completed') {
    let completed = filterTask(true);
    console.log(completed)
    completed.map(task => insertTaskinList(task, nodos.ulMain))
    nodos.hashAllBtn.classList.remove('selected')
    nodos.hashPendingBtn.classList.remove('selected')
    nodos.hashcompletedBtn.classList.add('selected')
  } else {
    let defaultasklist = JSON.parse(localStorage.getItem('mydayapp-js'));
    console.log(defaultasklist)
    defaultasklist.map(task => insertTaskinList(task, nodos.ulMain))
    nodos.hashAllBtn.classList.add('selected')
    nodos.hashPendingBtn.classList.remove('selected')
    nodos.hashcompletedBtn.classList.remove('selected')
  }
};

function destoy(task) {
  let tasklist = localStorage.getItem('mydayapp-js') ? JSON.parse(localStorage.getItem('mydayapp-js')) : [];
  let newTaskList = [];
  for (let i = 0; i < tasklist.length; i++) {
    if (tasklist[i].id != task.id) { newTaskList.push(tasklist[i]) }
  }

  let tasklistForLS = JSON.stringify(newTaskList)
  console.log('array mas final que el final en deleted');
  console.log(tasklistForLS);
  // 
  localStorage.setItem('mydayapp-js', tasklistForLS);
  if (newTaskList == []) {
    haveTask();
  };
  location.reload();

}

function checkIsFirstTask() {
  let itemsInLS = JSON.parse(localStorage.getItem('mydayapp-js'));
  console.log(itemsInLS)
  if (itemsInLS.length == 1) {
    location.reload();
  }
}
//--------------------------------------------------------------------------------
function insertTaskinList(task, conteiner) {
  const liTask = document.createElement('li');
  if (task.completed) {
    liTask.classList.add('completed')
  }
  const divTask = document.createElement('div');
  divTask.classList.add('view');
  const inputTask = document.createElement('input');
  inputTask.classList.add('toggle');
  inputTask.setAttribute('type', 'checkbox');
  if (task.completed) {
    inputTask.setAttribute('checked', 'true')
  }
  inputTask.addEventListener("click", validaCheckbox, false);
  const btnTask = document.createElement('button');
  btnTask.classList.add('destroy');
  const inputEditTask = document.createElement('input');
  inputEditTask.classList.add('edit');
  inputEditTask.setAttribute('value', `${task.title}`)


  //-- trabajos con addEvent Lissener  dentro del inyeccion
  function validaCheckbox() {
    if (task.completed === true) {
      editTask(task, 'completed', false)
      liTask.classList.remove('completed')
    } else {
      editTask(task, 'completed', true)
      liTask.classList.add('completed')
    }
    showPendingShurkut();

  }
  const labelTask = document.createElement('label');
  labelTask.innerText = `${task.title}`;
  labelTask.addEventListener('dblclick', () => {
    liTask.classList.add('editing');
    inputEditTask.focus();

    inputEditTask.addEventListener("keyup", function (event) {
      if (event.code === 'Enter') {
        let newValue = inputEditTask.value.trim();
        console.log(newValue)
        liTask.classList.remove('editing');
        labelTask.innerText = newValue
        editTask(task, 'title', newValue);
      } else if (event.code === 'Escape') {
        liTask.classList.remove('editing');
        labelTask.innerText = task.title
      }
    })
  });

  btnTask.addEventListener('click', () => {
    destoy(task);
    liTask.innerHTML = '';
    showPendingShurkut();
  })

  //------inyeccion---
  conteiner.appendChild(liTask);
  liTask.appendChild(divTask);
  liTask.appendChild(inputEditTask);
  divTask.appendChild(inputTask);
  divTask.appendChild(labelTask);
  divTask.appendChild(btnTask);

  showPendingShurkut();


}




export { createTask, haveTask, createId, insertTaskinList, filterTask, clearCompleted, showPendingShurkut, showTaskForHash, checkIsFirstTask }

