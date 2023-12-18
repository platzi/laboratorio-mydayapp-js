import * as controller from "../../controller";

export const deleteButton = (toDo, toDos) => {
  const deleteItem = (id) => {
    controller.destroy(id, toDos);
  };

  const button = document.createElement("button");
  button.classList.add("destroy");
  button.addEventListener("click", () => deleteItem(toDo.id));

  return button;
};
