export const render = function () {
  // main input
  const input = document.querySelector(".new-todo");

  // new task
  input.addEventListener("keypress", function (e) {
    if ((e.key === "Enter") & (input.value !== "")) {
      renderElements(input.value);
    }
  });

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

    for (let i = 0; i < list.length; i++) {
      // 1. checkbox
      toggle[i].addEventListener("click", function () {
        toggle[i].checked = toggle[i].checked && true;
        toggle[i].setAttribute("checked", "checked");
        list[i].setAttribute(
          "class",
          `${toggle[i].checked ? "completed" : ""}`
        );
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
      });
      // 4. destroy task
      destroyBtn[i].addEventListener("click", function () {
        list[i].remove();
      });
    }
  }
};
