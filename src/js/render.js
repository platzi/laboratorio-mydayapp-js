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
  }
};
