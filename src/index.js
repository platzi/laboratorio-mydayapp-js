import "./css/base.css";
import { data } from './js/data.js';
import { paths } from './js/paths.js';
import { todoArray } from './js/utils'
import { selectors } from './js/utils';

function hideMainAndFooter() {  
    if(todoArray.length === 0) {
        selectors.footer.classList.add('hidden');
        selectors.main.classList.add('hidden');
    } else {
        selectors.footer.classList.remove('hidden');
        selectors.main.classList.remove('hidden');
    }
}

function itemLeft() {
    let count = 0;
    let code = '';
    let plural = 's';
    todoArray.forEach(item => {
        if(!item.completed) {
            count++;
        }
    });
    if(count === 1) {
        plural = '';
    }
    code = `<strong>${count}</strong> item${plural} left`
    return code;
}

function renderTodo(state = 'all') {
    selectors.todoList.innerHTML = '';
    todoArray.forEach(item => {
        const todoLi = document.createElement('li');
        if(item.completed) {
            todoLi.classList.add('completed');
        } else {
            todoLi.classList.remove('completed');
        }
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('view');
        const todoInput = document.createElement('input');
        todoInput.classList.add('toggle');
        if(item.completed) {
            todoInput.checked = true;            
        } 
        todoInput.setAttribute('type', 'checkbox');
        const todoLabel = document.createElement('label');
        todoLabel.innerText = item.title;
        const destroyButton = document.createElement('button');
        destroyButton.classList.add('destroy');
        const editInput = document.createElement('input');
        editInput.classList.add('edit');
        editInput.setAttribute('value', item.title);
        selectors.todoList.appendChild(todoLi);
        todoLi.appendChild(todoDiv);
        todoDiv.appendChild(todoInput);
        todoDiv.appendChild(todoLabel);
        todoDiv.appendChild(destroyButton);
        todoLi.appendChild(editInput);
        todoInput.addEventListener('click', () => {
            if(todoInput.checked) {
                todoLi.classList.add('completed');
                item.completed = true;
            } else {
                todoLi.classList.remove('completed');
                item.completed = false;
            }
            selectors.todoCount.innerHTML = itemLeft();
        });
        todoLi.addEventListener('dblclick', () => {
            todoLi.classList.add('editing');
        });
        editInput.addEventListener('keyup', (ev) => {
            if(editInput.value != '') {
                if(ev.keyCode === 13) {                    
                    item.title = editInput.value.trim();
                    todoLabel.innerText = item.title;
                    todoLi.classList.remove('editing');
                } else if(ev.keyCode === 27) {
                    todoLabel.innerText = item.title;
                    editInput.value = item.title;
                    todoLi.classList.remove('editing');
                }
            }
            selectors.todoCount.innerHTML = itemLeft();
        });
        destroyButton.addEventListener('click', () => {
            const index = todoArray.findIndex(i => i.id === item.id);
            todoArray.splice(index, 1);
            selectors.todoCount.innerHTML = itemLeft();                
            if(todoArray.length === 0) {
                selectors.footer.classList.add('hidden');
                selectors.main.classList.add('hidden');
            }
            todoLi.remove();
        });  
        if(state === 'all') {
            todoDiv.classList.remove('hidden');
        } else if(state === 'pending' && item.completed === true) {
            todoDiv.classList.add('hidden');
        } else if(state === 'completed' && item.completed === false) {
            todoDiv.classList.add('hidden');
        }
    });
    localStorage.setItem('mydayapp-js', JSON.stringify(todoArray));
}

selectors.newTodo.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        if(selectors.newTodo.value !== '') {
            const newData = new data;
            newData.id = todoArray.length;
            newData.title = selectors.newTodo.value.trim();
            newData.completed = false;
            todoArray.push(newData);
            selectors.newTodo.value = '';
            renderTodo();
        }
    }
    hideMainAndFooter();         
    selectors.todoCount.innerHTML = itemLeft(); 
    localStorage.setItem('mydayapp-js', JSON.stringify(todoArray)); 
});

selectors.clearCompleted.addEventListener('click', () => {       
    function deleteTodo() {
        const i = todoArray.findIndex(item => item.completed);
        if (i > -1) {
            todoArray.splice(i, 1);
            deleteTodo();
        }
    }
    localStorage.setItem('mydayapp-js', JSON.stringify(todoArray));
    deleteTodo();
    renderTodo(); 
    hideMainAndFooter();   
});

window.addEventListener('hashchange', () => {
    if(location.hash.startsWith('#/pending')) {
        selectors.filters.innerHTML = paths.pending.template;
        renderTodo('pending');
    } else if(location.hash.startsWith('#/completed')) {
        selectors.filters.innerHTML = paths.completed.template;
        renderTodo('completed');
    } else {
        selectors.filters.innerHTML = paths.all.template;
        renderTodo('all');
    }
});

renderTodo('all');
hideMainAndFooter();
selectors.todoCount.innerHTML = itemLeft();
