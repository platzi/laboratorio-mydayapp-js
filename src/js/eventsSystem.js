const newInputHandler = (store) => {
  //new_input handler
  const new_input = document.querySelector(".new-todo");
  new_input.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      const title = e.target.value.trim();
      if (title.length == 0) {
        window.alert("the text must be at least 1 character long");
        return;
      } else {
        store.addItem(title);
        e.target.value = "";
      }
    }
  });
};

const getTasks = (store) => {
  const tasks = document.querySelectorAll(".todo-list li");
  tasks.forEach((task) => {
    const checkbox = task.querySelector(".toggle");
    checkbox.addEventListener("click", () => {
      store.switchItemState(task.id);
      if (checkbox.checked) {
        task.classList.add("completed");
      } else {
        task.classList.remove("completed");
      }
    });
  });
};

export { newInputHandler, getTasks };
