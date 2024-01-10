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

    if (listItem.classList == "") {
      listItem.classList.add("completed");
      target.setAttribute("checked", "checked");
    } else if (listItem.classList == "completed") {
      listItem.removeAttribute("class");
      target.removeAttribute("checked");
    }

    const liTasks = document.querySelectorAll(".todo-list li");
    const checkList = [];

    for (let i = 0; i < liTasks.length; i++) {
      const element = liTasks[i];
      const checkListString = element.outerHTML;
      checkList.push(checkListString);
    }

    localStorage.setItem("mydayapp-js", JSON.stringify(checkList));
    displayTasks();
  }
});

nodes.ulListTodo.addEventListener("click", (event) => {
  const target = event.target;
  const button = target.closest("button");
  const liClosest = target.closest("li");

  if (button) {
    console.log("Se preciono la X de ", liClosest);
    nodes.ulListTodo.removeChild(liClosest);

    const checkListArray = [];
    const liList = nodes.ulListTodo.querySelectorAll("li");

    for (let element of liList) {
      const elementString = element.outerHTML;
      checkListArray.push(elementString);
      console.log(checkListArray);
    }

    localStorage.setItem("mydayapp-js", JSON.stringify(checkListArray));
    displayTasks();
  }
});

nodes.ulListTodo.addEventListener("dblclick", (event) => {
  const target = event.target;
  const label = target.closest("label");
  const liClosest = target.closest("li");
  const index = Array.from(nodes.ulListTodo.children).indexOf(liClosest);

  if (label && liClosest.classList == "") {
    const allLiElements = nodes.ulListTodo.querySelectorAll("li");

    allLiElements.forEach((li) => {
      if (li !== liClosest) {
        li.remove();
      } else {
        const liEdit = document.createElement("li");
        liEdit.classList.add("editing");

        const divView = document.createElement("div");
        divView.classList.add("view");

        const inputToggle = document.createElement("input");
        inputToggle.classList.add("toggle");
        inputToggle.type = "checkbox";

        const labelEdit = document.createElement("label");

        const btnDestroy = document.createElement("button");
        btnDestroy.classList.add("destroy");

        const inputEdit = document.createElement("input");
        inputEdit.classList.add("edit");

        divView.appendChild(inputToggle);
        divView.appendChild(labelEdit);
        divView.appendChild(btnDestroy);

        liEdit.appendChild(divView);
        liEdit.appendChild(inputEdit);

        nodes.ulListTodo.appendChild(liEdit);
        inputEdit.focus();

        inputEdit.addEventListener("keydown", (event) => {
          const inputValue = inputEdit.value;

          if (inputValue && event.key === "Enter") {
            labelEdit.innerText = inputValue;
            const liEdit = document.querySelector(".editing");
            liEdit.removeAttribute("class");

            const checkList = localStorage.getItem("mydayapp-js");
            const checkListArray = JSON.parse(checkList) || [];
            checkListArray[index] = liEdit.outerHTML;
            const editedCheckList = JSON.stringify(checkListArray);
            localStorage.setItem("mydayapp-js", editedCheckList);

            displayTasks();
          } else if (event.key === "Escape") {
            displayTasks();
          }
        });
      }
    });
  }
});

function taskCounter() {
  const pendingItems = nodes.ulListTodo.querySelectorAll("li");

  const pendingWithoutCompleted = Array.from(pendingItems).filter((li) => {
    return !li.classList.contains("completed");
  });

  const countPendingWithoutCompleted = pendingWithoutCompleted.length;

  nodes.strong.innerText = countPendingWithoutCompleted;

  if (countPendingWithoutCompleted != 1) {
    nodes.taskCounter.innerHTML = `<strong>${countPendingWithoutCompleted}</strong> items left`;
  } else {
    nodes.taskCounter.innerHTML = `<strong>${countPendingWithoutCompleted}</strong> item left`;
  }
}

function saveTask(item) {
  const checkListString = item.outerHTML;

  const checkList = JSON.parse(localStorage.getItem("mydayapp-js")) || [];
  checkList.push(checkListString);

  localStorage.setItem("mydayapp-js", JSON.stringify(checkList));
  displayTasks();
}

function displayTasks() {
  if (!localStorage.getItem("mydayapp-js")) {
    nodes.mainSection.style.display = "none";
    nodes.footerSection.style.display = "none";
  } else {
    nodes.mainSection.style.display = "block";
    nodes.footerSection.style.display = "block";

    nodes.ulListTodo.innerHTML = "";

    const checkListArray = JSON.parse(localStorage.getItem("mydayapp-js"));
    checkListArray.forEach((element) => {
      const divTemporal = document.createElement("div");
      divTemporal.innerHTML = element;

      nodes.ulListTodo.appendChild(divTemporal.firstChild);
      taskCounter();
    });
  }
}

displayTasks();
