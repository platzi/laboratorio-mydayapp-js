export const label = (toDo, li, input) => {
  const label = document.createElement("label");
  label.textContent = toDo.title;
  label.addEventListener("dblclick", () => {
    if (!li.classList.contains("completed")) {
      li.classList.add("editing");
      input.focus();
    }
  });

  return label;
};
