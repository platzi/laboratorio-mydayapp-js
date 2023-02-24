const listGenerator = (list) => {
  //select task container and clean it
  const to_do_list = document.querySelector(".todo-list");
  to_do_list.innerHTML = "";
  //iterating and adding every task
  list.forEach((item) => {
    // defining task inside content
    const primitiveTask = `
    <div class="view">
      <input class="toggle" type="checkbox" ${
        item.completed ? "checked" : ""
      } />
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

const mfControl = (list) => {
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

const footerItemsControl = (list) => {
  if (list.length == 1) {
    const todo_count = document.querySelector(".todo-count");
    todo_count.innerHTML = "";
    todo_count.innerHTML = `<strong>${list.length}</strong> item left`;
  } else {
    const todo_count = document.querySelector(".todo-count");
    todo_count.innerHTML = "";
    todo_count.innerHTML = `<strong>${list.length}</strong> items left`;
  }
};

export { listGenerator, mfControl, footerItemsControl };
