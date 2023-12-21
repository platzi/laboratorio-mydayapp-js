const ID = "todo-list";

export const main = (toDosCollection) => {
  if (toDosCollection.filteredToDos.length === 0) return;

  const main = document.createElement("section");
  main.classList.add("main");

  const ul = document.createElement("ul");
  ul.classList.add("todo-list");
  ul.id = ID;

  main.appendChild(ul);

  return main;
};
