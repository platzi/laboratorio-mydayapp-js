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

export const createTodoUI = (todo) => {
  const { title, completed } = todo;

  // Possible states for the container are completed and editing
  const container = createHTMLElement({
    element: "li",
    classList: completed ? [completed] : null,
  });

  const view = createHTMLElement({ element: "div", classList: ["view"] });

  const check = createHTMLElement({
    element: "input",
    classList: ["toggle"],
    attributes: [{ name: "type", value: "checkbox" }],
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
