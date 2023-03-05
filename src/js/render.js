const MyDayApp = require("./crud");

export const render = function () {
  const service = new MyDayApp();

  // main input
  const input = document.querySelector(".new-todo");

  // task counter
  let todoCount;
  let count = 0;

  // new task
  input.addEventListener("keypress", function (e) {
    if ((e.key === "Enter") & (input.value !== "")) {
      service.create(input.value, (input.value = "")),
        renderElements(service.tasks, false);
    }
  });

  // hide main and footer
  function hideSections(boolean) {
    let hideSection = boolean ? "block" : "none";
    document.getElementsByClassName("main")[0].style.display = hideSection;
    document.getElementsByClassName("footer")[0].style.display = hideSection;
  }

  /* hide clear button */
  function hideClearBtn() {
    let taskCompleted = service.tasks.some(function (task) {
      return task.completed === true;
    });
    document.querySelector(".clear-completed").style.visibility = `${
      taskCompleted ? "visible" : "hidden"
    }`;
  }

  /* seleted button */
  const selectedBtn = document.querySelectorAll("li a");
  for (let i = 0; i < selectedBtn.length; ++i) {
    selectedBtn[i].addEventListener("click", function () {
      document.querySelector(".selected").classList.remove("selected");
      document.querySelectorAll("a")[i].classList.add("selected");
    });
  }

  // pluralizing word
  function pluralize() {
    let word =
      count > 1 ? ["item left", "items left"] : ["items left", "item left"];
    document.querySelector(".todo-count").innerHTML = document
      .querySelector(".todo-count")
      .innerHTML.replace(`${word[0]}`, `${word[1]}`);
    todoCount = document.querySelector(".todo-count strong");
    todoCount.innerHTML = count;
  }

  // rendering exitly elements
  renderElements(service.tasks, true);

  function renderElements(tasks, onlyOnce) {
    onlyOnce &&
      (document.querySelector(`.main`).innerHTML = `<ul class=todo-list><ul>`);
    // render element
    for (let i = 0; i < tasks.length; ++i) {
      if (i === tasks.length - 1 || onlyOnce) {
        document.querySelector(`.todo-list`).innerHTML += `
        ${tasks[i].completed ? '<li class="completed">' : "<li>"}
          <div class="view">
            <input class="toggle" type="checkbox" ${
              tasks[i].completed && "checked"
            }/>
            <label>${tasks[i].title}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value='${tasks[i].title}' />
        </li>`;
      }
    }

    // element tasks
    const list = document.querySelectorAll(".todo-list li");
    const toggle = document.querySelectorAll(".toggle");
    const label = document.querySelectorAll("label");
    const edit = document.querySelectorAll("input.edit");
    const destroyBtn = document.querySelectorAll(".destroy");
    const clearBtn = document.querySelector(".clear-completed");
    count = service.tasks.filter(function (task) {
      return task.completed === false;
    }).length;
    const id = new Object();
    for (let i = 0; i < list.length; i++) {
      id[i] = service.tasks[i].id;
      // 1. checkbox
      toggle[i].addEventListener("click", function () {
        toggle[i].checked = toggle[i].checked && true;
        toggle[i].checked ? --count : ++count;
        toggle[i].checked = toggle[i].checked && true;
        toggle[i].setAttribute("checked", "checked");
        list[i].setAttribute(
          "class",
          `${toggle[i].checked ? "completed" : ""}`
        );
        count == 1 || count == 2 ? pluralize() : (todoCount.innerHTML = count);
        service.update(id[i], toggle[i].checked);
        hideClearBtn();
      });
      // 2.edit item
      label[i].addEventListener("dblclick", function () {
        list[i].setAttribute("class", "editing");
        edit[i].focus();
      });
      // event key-up
      edit[i].addEventListener("keyup", function (e) {
        toggle[i].style.display = "none";
        label[i].style.display = "none";
        switch (e.key) {
          case "Enter":
            toggle[i].checked = toggle[i].checked && true;
            toggle[i].checked && ++count;
            toggle[i].checked = false;
            list[i].setAttribute("class", "");
            toggle[i].style.display = "block";
            label[i].style.display = "block";
            label[i].innerText = edit[i].value;
            service.update(id[i], edit[i].value.trim());
            service.update(id[i], toggle[i].checked);
            break;
          case "Escape":
            toggle[i].checked = toggle[i].checked && true;
            list[i].setAttribute(
              "class",
              `${toggle[i].checked ? "completed" : ""}`
            );
            toggle[i].style.display = "block";
            label[i].style.display = "block";
            break;
        }
        count == 1 || count == 2 ? pluralize() : (todoCount.innerHTML = count);
      });
      // 4. destroy task
      destroyBtn[i].addEventListener("click", function () {
        !toggle[i].checked && --count;
        list[i].remove();
        service.delete(id[i]);
        delete id[i];
        count == 1 || count == 2 ? pluralize() : (todoCount.innerHTML = count);
        tasks.length === 0 && hideSections(false);
        hideClearBtn();
      });
      // 5. destroy tasks completed
      clearBtn.addEventListener("click", function () {
        if (list[i].classList[0] == "completed") {
          service.delete(id[i]);
          delete id[i];
          list[i].remove();
        }
        count == 1 || count == 2 ? pluralize() : (todoCount.innerHTML = count);
        tasks.length === 0 && hideSections(false);
        hideClearBtn();
      });
    }
    service.tasks.length === 0 ? hideSections(false) : hideSections(true);
    pluralize();
    hideClearBtn();
  }
  // 6. filter each all, pending and completed tasks
  window.addEventListener("hashchange", function () {
    let filterTasks;
    if (location.hash === `#/`) {
      filterTasks = service.tasks;
    } else if (location.hash === `#/pending`) {
      filterTasks = service.tasks.filter(function (task) {
        return task.completed === false;
      });
    } else if (location.hash === "#/completed") {
      filterTasks = service.tasks.filter(function (task) {
        return task.completed === true;
      });
    }
    renderElements(filterTasks, true);
  });
};
