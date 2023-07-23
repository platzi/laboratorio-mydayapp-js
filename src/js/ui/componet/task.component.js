function Task({ id, title, completed }) {
  const taskItem = document.createElement("li");
  taskItem.className = completed ? "completed" : "";

  const view = document.createElement("div");
  view.className = "view";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed ? true : false;
  checkbox.className = "toggle";
  checkbox.addEventListener("change", () => {
    const event = new CustomEvent("stateChanged", {
      detail: {
        id,
      },
    });
    document.dispatchEvent(event);
  });

  const label = document.createElement("label");
  label.textContent = title;
  label.addEventListener("dblclick", () => {
    view.style.display = "none";
    edit.style.display = "block";
    edit.focus();
  });

  const destroy = document.createElement("button");
  destroy.className = "destroy";
  destroy.addEventListener("click", () => {
    const event = new CustomEvent("deleteTask", {
      detail: {
        id,
      },
    });
    document.dispatchEvent(event);
  });

  view.appendChild(checkbox);
  view.appendChild(label);
  view.appendChild(destroy);

  const edit = document.createElement("input");
  edit.value = title;
  edit.className = "edit";

  edit.addEventListener("keydown", (e) => {
    const event = new CustomEvent("editTask", {
      detail: {
        id,
        newTitle: edit.value.trim(),
      },
    });
    if (e.key === "Enter") {
      document.dispatchEvent(event);
    }
    if (e.key === "Escape") {
      view.style.display = "block";
      edit.style.display = "none";
    }
  });

  taskItem.appendChild(view);
  taskItem.appendChild(edit);
  return taskItem;
}

export default Task;
