export const createTodoUI = (todo) => {
  const { title, state } = todo;

  // Possible states for the container are completed and editing
  const container = document.createElement("li");
  if (state === "completed") container.classList.add("completed");

  const view = document.createElement("div");
  view.classList.add("view");

  const check = document.createElement("input");
  check.classList.add("toggle");
  check.setAttribute("type", "checkbox");

  const label = document.createElement("label");
  label.textContent = title;

  const button = document.createElement("button");
  button.classList.add("destroy");

  view.appendChild(check);
  view.appendChild(label);
  view.appendChild(button);

  const input = document.createElement("input");
  input.classList.add("edit");
  input.value = title;

  container.appendChild(view);
  container.appendChild(input);

  return container;
};
