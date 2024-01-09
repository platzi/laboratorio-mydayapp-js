import "./css/base.css";

import * as nodes from "./js/nodes.js";

nodes.inputNewTodo.addEventListener("keydown", (event) => {
  let inputValue = nodes.inputNewTodo.value;

  if (inputValue && event.key === "Enter") {
    const newTasks = document.createElement("li");

    const divView = document.createElement("div");
    divView.classList.add("view");

    const inputToggle = document.createElement("input");
    inputToggle.classList.add("toggle");
    inputToggle.type = "checkbox";

    const label = document.createElement("label");
    label.innerText = inputValue.trim();

    const btnDestroy = document.createElement("button");
    btnDestroy.classList.add("destroy");

    const inputEdit = document.createElement("input");
    inputEdit.classList.add("edit");

    divView.appendChild(inputToggle);
    divView.appendChild(label);
    divView.appendChild(btnDestroy);
    divView.appendChild(btnDestroy);

    newTasks.appendChild(divView);

    nodes.ulListTodo.appendChild(newTasks);

    nodes.inputNewTodo.value = "";

    saveTask(newTasks);
  }
});

nodes.ulListTodo.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("toggle")) {
    const listItem = target.closest("li");
    console.log('listItem', listItem.classList);

    if (listItem.classList == "") {
      listItem.classList.add("completed");
      target.setAttribute("checked", "checked");
    } else if(listItem.classList == "completed") {
      listItem.classList.remove("completed");
      target.removeAttribute("checked");
    }

    const liTasks = document.querySelectorAll('.todo-list li');
    const checkList = [];

    for (let i = 0; i < liTasks.length; i++) {
      const element = liTasks[i];
      const checkListString = element.outerHTML;
      checkList.push(checkListString);
    }

    localStorage.setItem('mydayapp-js', JSON.stringify(checkList));
    displayTasks();
  }
});

function saveTask(item) {
  const checkListString = item.outerHTML;

  const checkList = JSON.parse(localStorage.getItem('mydayapp-js')) || [];
  checkList.push(checkListString);
  console.log('Se creo una nueva tarea');

  localStorage.setItem('mydayapp-js', JSON.stringify(checkList));
  displayTasks();
}

function displayTasks() {
  if (!localStorage.getItem('mydayapp-js')) {
    nodes.mainSection.style.display = 'none';
    nodes.footerSection.style.display = 'none';
  } else {
    nodes.mainSection.style.display = 'block';
    nodes.footerSection.style.display = 'block';

    nodes.ulListTodo.innerHTML = "";

    const checkListString = JSON.parse(localStorage.getItem('mydayapp-js'));
    console.log(checkListString);
    checkListString.forEach(element => {
      const divTemporal = document.createElement("div");
      divTemporal.innerHTML = element;

      nodes.ulListTodo.appendChild(divTemporal.firstChild);
    });
  }
}

displayTasks();