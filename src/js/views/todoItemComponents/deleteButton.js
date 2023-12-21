import * as controller from "../../controller";

export const deleteButton = (toDo, toDosCollection) => {
  const deleteItem = (id) => {
    controller.destroy(id, toDosCollection);
  };

  const button = document.createElement("button");
  button.classList.add("destroy");
  button.addEventListener("click", () => deleteItem(toDo.id));

  return button;
};
