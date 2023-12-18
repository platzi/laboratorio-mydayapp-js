import * as controller from "../../controller";

export const checkbox = (toDo, toDos) => {
  const toggleCompletedState = (id, completedState) => {
    controller.update(id, { completed: !completedState }, toDos);
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
