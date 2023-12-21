import { checkbox } from "./todoItemComponents/checkbox";
import { deleteButton } from "./todoItemComponents/deleteButton";
import { inputEdit } from "./todoItemComponents/inputEdit";
import { label } from "./todoItemComponents/label";

export const todoItem = (toDo, toDosCollection) => {
  const li = document.createElement("li");
  toDo.completed ? li.classList.add("completed") : null;

  const div = document.createElement("div");
  div.classList.add("view");

  const checkboxComponent = checkbox(toDo, toDosCollection);
  const button = deleteButton(toDo, toDosCollection);
  const input = inputEdit(toDo, toDosCollection, li);
  const labelComponent = label(toDo, li, input);

  div.appendChild(checkboxComponent);
  div.appendChild(labelComponent);
  div.appendChild(button);

  li.appendChild(div);
  li.appendChild(input);

  return li;
};
