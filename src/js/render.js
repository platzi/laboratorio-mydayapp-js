export const render = function () {
  // main input
  const input = document.querySelector(".new-todo");

  // task counter
  let todoCount;
  let count = 0;

  // new task
  input.addEventListener("keypress", function (e) {
    if ((e.key === "Enter") & (input.value !== "")) {
      renderElements(input.value);
    }
  });

  // hide main and footer
  function hideSections(boolean) {
    let hideSection = boolean ? "block" : "none";
    document.getElementsByClassName("main")[0].style.display = hideSection;
    document.getElementsByClassName("footer")[0].style.display = hideSection;
  }
  hideSections(false);

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

  function renderElements(task) {
    // render element
    document.querySelector(`.todo-list`).innerHTML += `
    <li>
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label>${task}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value='${task}' />
    </li>`;

    // element tasks
    const list = document.querySelectorAll(".todo-list li");
    const toggle = document.querySelectorAll(".toggle");
    const label = document.querySelectorAll("label");
    const edit = document.querySelectorAll("input.edit");
    const destroyBtn = document.querySelectorAll(".destroy");
    count = ++count;

    for (let i = 0; i < list.length; i++) {
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
        count == 1 || count == 2 ? pluralize() : (todoCount.innerHTML = count);
      });
    }
    hideSections(true);
    pluralize();
  }
};
