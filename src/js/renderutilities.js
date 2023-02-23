const listGenerator = (list) => {
  //select task container and clean it
  const to_do_list = document.querySelector(".todo-list");
  to_do_list.innerHTML = "";
  //iterating and adding every task
  list.forEach((item) => {
    // defining task inside content
    const primitiveTask = `
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label>${item.title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${item.title}" />
    `;

    // creating task container adding id and content
    const task = document.createElement("li");
    task.id = item.id;
    task.innerHTML = primitiveTask;

    // contional behaviour
    if (item.completed == true) {
      task.classList.add("completed");
    }

    to_do_list.appendChild(task);
  });
};

const mf_control = (list) => {
  if (list.length == 0) {
    const main_section = document.querySelector(".main");
    const footer = document.querySelector(".footer");
    main_section.setAttribute("style", "display:none");
    footer.setAttribute("style", "display:none");
  } else {
    const main_section = document.querySelector(".main");
    const footer = document.querySelector(".footer");
    main_section.setAttribute("style", "display:block");
    footer.setAttribute("style", "display:block");
  }
};

export { listGenerator, mf_control };
