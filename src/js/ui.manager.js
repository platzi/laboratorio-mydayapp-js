import { toggleTodoCompleted } from "./store.manager";

/**
 *
 * @param {{element: string, classList: number[], attributes: {name: string, value: string}[]}} requirements
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

  const button = createHTMLElement({
    element: "button",
    classList: ["destroy"],
  });

  view.appendChild(check);
  view.appendChild(label);
  view.appendChild(button);

  const input = createHTMLElement({ element: "input", classList: ["edit"] });
  input.value = title;

  container.appendChild(view);
  container.appendChild(input);

  return container;
};
