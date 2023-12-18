import * as controller from "../../controller";

export const inputEdit = (toDo, toDos, li) => {
  const updateTitle = (id, title) => {
    if (toDo.title === title || title == "") return;

    controller.update(id, { title }, toDos);
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
