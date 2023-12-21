import { filterLink } from "./filterLink";
import { clearCompletedButton } from "./clearCompletedButton";

export const footer = (toDosCollection, controller) => {
  if (toDosCollection.toDos.length === 0) return;

  const pendingTodos = toDosCollection.countPending();

  const footer = document.createElement("footer");
  footer.classList.add("footer");

  const span = document.createElement("span");
  span.classList.add("todo-count");
  span.innerHTML = `<strong>${pendingTodos}</strong> ${
    pendingTodos > 1 ? "items" : "item"
  } left`;

  const ul = document.createElement("ul");
  ul.classList.add("filters");

  const all = filterLink("#/all", "All", toDosCollection.filter);
  const pending = filterLink("#/pending", "Pending", toDosCollection.filter);
  const completed = filterLink(
    "#/completed",
    "Completed",
    toDosCollection.filter
  );
  const button = clearCompletedButton(toDosCollection, controller);

  ul.appendChild(all);
  ul.appendChild(pending);
  ul.appendChild(completed);
  footer.appendChild(span);
  footer.appendChild(ul);
  footer.appendChild(button);

  return footer;
};
