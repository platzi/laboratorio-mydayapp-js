import "./css/base.css";

import { idGenerator } from "./js/idGeneratos";

const input = document.querySelector('.new-todo');
const listTodosQuery = document.querySelector('.todo-list');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const footerText = document.querySelector('.todo-count');
const clearCompletedBtn = document.querySelector('.clear-completed');
const filters = document.querySelector(".filters");
const all = filters.children[0]
const pending = filters.children[1]
const completed = filters.children[2]

let todoList = [];

window.addEventListener('hashchange', router);

function router() {
  let hash = window.location.hash.substring(2);

  todoListGenerator(hash);
}

function loadPage() {

  todoList = JSON.parse(localStorage.getItem('mydayapp-js'));
  if (!todoList) {
    todoList = [];
    sincLocalStorage();
    todoListGenerator()
  } else {
    todoListGenerator()
  };

}

input.addEventListener('keypress', addTodo);

function addTodo(e) {
  const todo = input.value.trim();
  if (e.key === 'Enter') {
    if (todo === '') {
      alert('The field is Empty...');
      return;
    };
    const todoItem = {
      id: idGenerator(),
      title: todo,
      completed: false
    };
    todoList = [...todoList, todoItem];
    input.value = '';
    todoListGenerator();
  };
};

function deleteTodo(e) {
  const id = e.target.id;
  todoList = todoList.filter(todo => todo.id != id);
  todoListGenerator();
};

function toogleTodo(e) {
  const id = e.target.id;

  todoList.forEach(element => {
    if (element.id === id) {
      if (!element.completed) {
        element.completed = true;
      } else {
        element.completed = false
      }
    }
  });

  sincLocalStorage();
  todoListGenerator()
};

function editTodo(e) {
  const id = e.target.id;
  const padre = e.target.parentNode;
  const li = padre.parentNode;
  const input = li.lastChild;
  const lastValue = e.target.innerText;

  li.className = 'editing';

  input.focus();
  input.value = lastValue;

  input.addEventListener('keydown', ({ key }) => {
    const todoNew = input.value.trim();
    if (key === 'Enter') {
      if (todoNew === '') {
        alert('The field is Empty...');
        return;
      };
      todoList.forEach(element => {
        if (element.id === id) {
          element.title = todoNew;
          element.completed = false;
        }

      });

      sincLocalStorage();
      todoListGenerator();

    };
    if (key === "Escape") {
      li.className = '';
    }
  });
};

function clearCompleted() {
  todoList = todoList.filter(todo => !todo.completed)
  sincLocalStorage();
  todoListGenerator();
};

function todoListGenerator(hash = '') {
  main.style.display = "block";
  footer.style.display = "block";

  clearList();

  let todoToShow = todoList

  if (hash === 'completed') {
    todoToShow = todoToShow.filter(todo => todo.completed);
  };

  if (hash === 'pending') {
    todoToShow = todoToShow.filter(todo => !todo.completed)
  }

  if (todoToShow.length > 0) {
    todoToShow.forEach(todo => {
      const todoLi = document.createElement("li");
      const todoDiv = document.createElement("div")
      todoDiv.className = 'view';
      const todoCheckbox = document.createElement('input');
      todoCheckbox.className = 'toggle';
      todoCheckbox.type = 'checkbox';
      todoCheckbox.id = todo.id;
      if (todo.completed) {
        todoLi.className = "completed"
        todoCheckbox.checked = true
      }
      todoCheckbox.addEventListener('click', toogleTodo);
      const todoLabel = document.createElement('label');
      todoLabel.innerText = todo.title;
      todoLabel.id = todo.id;
      todoLabel.addEventListener("dblclick", editTodo);
      const todoBtn = document.createElement('button');
      todoBtn.className = 'destroy';
      todoBtn.id = todo.id;
      todoBtn.addEventListener('click', deleteTodo)
      const todoInput = document.createElement('input');
      todoInput.className = 'edit';

      todoDiv.appendChild(todoCheckbox);
      todoDiv.appendChild(todoLabel);
      todoDiv.appendChild(todoBtn);
      todoLi.appendChild(todoDiv);
      todoLi.appendChild(todoInput);

      listTodosQuery.appendChild(todoLi);

    });
  };

  sincLocalStorage();

  // FOOTER ACTIONS
  if (todoList.length === 0) {
    main.style.display = "none";
    footer.style.display = "none";
  } else {
    const itemsLeftNumber = todoList.filter(todo => !todo.completed);
    const itemsCompleted = todoList.filter(todo => todo.completed);

    const itemsLeftDisplay = document.createElement('strong');
    itemsLeftDisplay.innerText = itemsLeftNumber.length;
    let item;
    itemsLeftNumber.length == 1 ? (item = "item") : (item = "items");

    footerText.innerHTML = `<strong>${itemsLeftDisplay.innerText}</strong> ${item} left`;

    itemsCompleted.length === 0 ? (clearCompletedBtn.style.display = "none") : (clearCompletedBtn.style.display = 'block');

    clearCompletedBtn.addEventListener('click', clearCompleted);


    if (hash === 'completed') {
      all.children[0].className = '';
      pending.children[0].className = '';
      completed.children[0].className = 'selected';
    }

    if (hash === 'pending') {
      all.children[0].className = '';
      pending.children[0].className = 'selected';
      completed.children[0].className = '';
    };

    if (!hash) {
      all.children[0].className = 'selected';
      pending.children[0].className = '';
      completed.children[0].className = '';
    }

  };

};


function sincLocalStorage() {
  localStorage.setItem('mydayapp-js', JSON.stringify(todoList));
}

function clearList() {
  listTodosQuery.innerHTML = "";
};

loadPage()