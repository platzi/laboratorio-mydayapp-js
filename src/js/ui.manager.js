import {
  currentTodos,
  removeTodo,
  toggleTodoCompleted,
  updateTodo,
} from "./store.manager";
const todosCounter = document.querySelector("span.todo-count strong");

/**
 *
 * @param {{
 * element: string,
 * classList: number[],
 * attributes: {name: string, value: string}[]
 * }} requirements The object that describes the values for the HTML element.
 * @returns {HTMLElement}
 */
const createHTMLElement = (requirements) => {
  const element = document.createElement(requirements.element);

  if (requirements.classList) {
    for (const c of requirements.classList) {
      element.classList.add(c);
    }
  }

  if (requirements.attributes) {
    for (const a of requirements.attributes) {
      element.setAttribute(a.name, a.value);
    }
  }

  return element;
};

/**
 *
 * @param {{id: string, title: string, completed: boolean}} todo
 * @returns {HTMLLIElement}
 */
export const createTodoUI = (todo) => {
  const { id, title, completed } = todo;

  const container = createHTMLElement({
    element: "li",
    classList: completed ? ["completed"] : null,
  });

  const view = createHTMLElement({ element: "div", classList: ["view"] });

  const check = createHTMLElement({
    element: "input",
    classList: ["toggle"],
    attributes: [{ name: "type", value: "checkbox" }],
  });

  check.checked = completed;

  check.addEventListener("click", () => {
    toggleTodoCompleted(id);
    container.classList.toggle("completed");
  });

  const label = createHTMLElement({ element: "label" });
  label.textContent = title;

  label.addEventListener("dblclick", () => {
    container.classList.add("editing");
    input.focus();
  });

  const button = createHTMLElement({
    element: "button",
    classList: ["destroy"],
  });

  button.addEventListener("click", () => {
    removeTodo(id);
    // Remove the parent element, so, the todo disappears from the UI
    container.remove();
    updateTodosCounter();
  });

  view.appendChild(check);
  view.appendChild(label);
  view.appendChild(button);

  const input = createHTMLElement({ element: "input", classList: ["edit"] });
  input.value = title;

  input.addEventListener("keydown", (eventKey) => {
    const { key } = eventKey;

    if (key === "Enter") {
      const [title, success] = updateTodo(id, input.value);
      container.classList.remove("editing");

      if (success) {
        label.textContent = title;
      }
    } else if (key === "Escape") {
      container.classList.remove("editing");
    }
  });

  container.appendChild(view);
  container.appendChild(input);

  return container;
};

export const updateTodosCounter = () => {
  todosCounter.textContent = currentTodos.length;
};
