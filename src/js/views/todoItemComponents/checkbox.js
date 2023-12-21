import * as controller from "../../controller";

export const checkbox = (toDo, toDosCollection) => {
  const toggleCompletedState = (id, completedState) => {
    controller.update(id, { completed: !completedState }, toDosCollection);
  };

  const checkbox = document.createElement("input");

  checkbox.classList.add("toggle");
  checkbox.type = "checkbox";
  checkbox.checked = toDo.completed;
  checkbox.addEventListener("change", () =>
    toggleCompletedState(toDo.id, toDo.completed)
  );

  return checkbox;
};
