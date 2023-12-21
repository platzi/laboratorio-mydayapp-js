import * as controller from "../../controller";

export const inputEdit = (toDo, toDosCollection, li) => {
  const updateTitle = (id, title) => {
    if (toDo.title === title || title == "") return;

    controller.update(id, { title }, toDosCollection);
  };

  const input = document.createElement("input");
  input.classList.add("edit");
  input.value = toDo.title;
  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      li.classList.remove("editing");
      updateTitle(toDo.id, input.value.trim());
    }
  });

  return input;
};
