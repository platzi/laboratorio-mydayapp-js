import {
  filterTodos,
  removeTodo,
  toggleTodoCompleted,
  updateTodo,
} from "./store.manager";
import { getCurrentHash } from "./utils";

const todosList = document.querySelector(".todo-list");
const mainElement = document.getElementById("main");
const footerElement = document.getElementById("footer");
const todosCounter = document.querySelector("span.todo-count");
const clearCompletedButton = document.querySelector("button.clear-completed");

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
    updateUI();
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
    container.remove();
    updateUI();
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
        input.value = title;
      }
    } else if (key === "Escape") {
      container.classList.remove("editing");
    }
  });

  container.appendChild(view);
  container.appendChild(input);

  return container;
};

export const updateUI = (todos) => {
  if (!todos) todos = filterTodos(getCurrentHash());

  // If there are not todos with the current filter,
  // redirect to the /all view, so, when the user add a new todo,
  // the '#main' HTML element appears.
  if (todos.length === 0) {
    alert("There aren't todos to display with the selected filter");
    window.location.hash = "#/all";
    document.querySelector("a.selected").classList.remove("selected");
    document.querySelector("a[href='#/']").classList.add("selected");
    return;
  }

  // Update main and footer items
  const currentLenght = todos.length;
  mainElement.style.display = currentLenght > 0 ? "block" : "none";
  footerElement.style.display = currentLenght > 0 ? "block" : "none";

  // Render each todo
  todosList.innerHTML = "";
  todos.forEach((todo) => {
    todosList.appendChild(createTodoUI(todo));
  });

  todosCounter.innerHTML = `
    <strong>${todos.length}</strong>
    ${todos.length > 1 || todos.length === 0 ? "items left" : "item left"}
  `;

  // Hide the "Clear completed" when there are not completed todos
  clearCompletedButton.style.display =
    filterTodos("completed").length > 0 ? "block" : "none";
};
