/* eslint-disable prettier/prettier */
import "./css/base.css";

const inputNewTodo = document.querySelector('.new-todo');
const todoListUl = document.querySelector('.todo-list');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const span = document.createElement('span');
span.classList.add('todo-count');
const strong = document.createElement('strong');
const btnClearCompleted = document.querySelector('.clear-completed');
const btnAll = document.querySelector('#btn1');
const btnPending = document.querySelector('#btn2');
const btnCompleted = document.querySelector('#btn3');

window.addEventListener('load', () => {

    if (localStorage.length === 0){ 
        main.setAttribute('style', 'display:none');
        footer.setAttribute('style', 'display:none');
    } else {
        showTask();
        pendingItems();
    }

})

inputNewTodo.addEventListener('keyup', function(event) {

    if (event.key === 'Enter') {

        createTask();
        location.reload();
        
        inputNewTodo.value = '';
    }

});

btnClearCompleted.addEventListener('click', () => {
    
    let tasks = JSON.parse(localStorage.getItem('mydayapp-js'));

    let pendingItem= [];
  
    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].estado === 'pending') {

            pendingItem.push(tasks[i]); 

        }    
    }

    let tasksJSON = JSON.stringify(pendingItem);
    localStorage.setItem('mydayapp-js', tasksJSON);

    location.reload();
    showTask();

});

btnPending.addEventListener('click', () => {

    todoListUl.innerHTML = '';
    btnPending.classList.add('selected');
    showTask('pending');
    btnAll.classList.remove('selected');
    
});

btnCompleted.addEventListener('click', () => {

    todoListUl.innerHTML = '';
    btnCompleted.classList.add('selected');
    showTask('completed');
    btnAll.classList.remove('selected');
    
});

btnAll.addEventListener('click', () => {

    todoListUl.innerHTML = '';
    btnAll.classList.add('selected');
    showTask();

});

function createTask(){

    let item;

    if (inputNewTodo.value === '') {

        alert("Debes escribir una tarea");

        return;
        
    } else {

        item = {
            task:(inputNewTodo.value).trim(),
            estado: 'pending'
        };

    }

    let tasks = JSON.parse(localStorage.getItem('mydayapp-js')) || [];

    if (item) {

        tasks.push(item)
    } 
        
    let tasksJSON = JSON.stringify(tasks);
    localStorage.setItem('mydayapp-js', tasksJSON);
    
    todoListUl.innerHTML = ''
    showTask();
}

function showTask(params){

    let tasks;

    if (params == 'completed') {

        let localS = JSON.parse(localStorage.getItem('mydayapp-js'));
        tasks = localS.filter((task)=> task.estado == 'completed');

    } else if (params == 'pending'){

        let localS = JSON.parse(localStorage.getItem('mydayapp-js'));
        tasks = localS.filter((task)=> task.estado == 'pending');

    } else if (!params) {

        tasks = JSON.parse(localStorage.getItem('mydayapp-js'));
    }
    
    tasks.forEach(task => {

        const liTask = document.createElement('li');
        const divsViews = document.createElement('div');
        const inputTask = document.createElement('input');
        const labels = document.createElement('label');
        const btnDestroy = document.createElement('button');
        const inputEdit = document.createElement('input');
        divsViews.classList.add('view');
        inputTask.classList.add('toggle');
        inputTask.setAttribute('type','checkbox');
        labels.innerText = task.task;
        btnDestroy.classList.add('destroy');
        inputEdit.classList.add('edit');
        inputEdit.setAttribute('value', task.task);
    
        todoListUl.appendChild(liTask);
        liTask.appendChild(divsViews);
        liTask.appendChild(inputEdit);
        divsViews.appendChild(inputTask);
        divsViews.appendChild(labels);
        divsViews.appendChild(btnDestroy);

        if (task.estado === 'completed'){

            liTask.classList.add('completed');
            inputTask.setAttribute('checked', 'true')
    
        } 

        btnDestroy.addEventListener('click', () => {

            location.reload();

            let destroyIndex = tasks.indexOf(task);

            let remove = tasks.splice(destroyIndex, 1);

            let tasksJSON = JSON.stringify(tasks);
            localStorage.setItem('mydayapp-js', tasksJSON);

            liTask.innerText = '';
        });

        inputTask.addEventListener('click', () => {

            if (task.estado === 'pending') {
                
                task.estado = 'completed';
                liTask.classList.add('completed');
    
                let tasksJSON = JSON.stringify(tasks);
                localStorage.setItem('mydayapp-js', tasksJSON);
    
            } else {
    
                task.estado = 'pending';
                liTask.classList.remove('completed');
                
               let tasksJSON = JSON.stringify(tasks);
                localStorage.setItem('mydayapp-js', tasksJSON);
            } 

            strong.innerText = ''
            pendingItems();
        
        });
        
        labels.addEventListener('dblclick', () => {
            
            liTask.classList.add('editing');
            inputEdit.focus();            
            
            inputEdit.addEventListener('keyup', function(event) {

                if (event.key === 'Enter') {
            
                    task.task = inputEdit.value.trim();
                    labels.innerText = inputEdit.value.trim();
                    liTask.classList.remove('editing');

                    let tasksJSON = JSON.stringify(tasks);
                    localStorage.setItem('mydayapp-js', tasksJSON);

                } else if (event.key === 'Escape'){
                    liTask.classList.remove('editing');
                }
            });

        });
    });
};

function pendingItems () {

    let tasks = JSON.parse(localStorage.getItem('mydayapp-js'));
    
    let pendingCont = 0;
    
    for (let i = 0; i < tasks.length; i++) {
        
        if (tasks[i].estado === 'pending') {

            pendingCont = pendingCont + 1;
        }    
    }

    if (pendingCont === 0 || pendingCont > 1) {

        strong.innerText = `${pendingCont} items left`

    } else if (pendingCont === 1) {

        strong.innerText = `${pendingCont} item left`

    };
    
    
    footer.appendChild(span);
    span.appendChild(strong);
}