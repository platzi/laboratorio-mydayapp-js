import { checkbox } from "./todoItemComponents/checkbox";
import { deleteButton } from "./todoItemComponents/deleteButton";
import { inputEdit } from "./todoItemComponents/inputEdit";
import { label } from "./todoItemComponents/label";

export const todoItem = (toDo, toDos) => {
  const li = document.createElement("li");
  toDo.completed ? li.classList.add("completed") : null;

  const div = document.createElement("div");
  div.classList.add("view");

  const checkboxComponent = checkbox(toDo, toDos);
  const button = deleteButton(toDo, toDos);
  const input = inputEdit(toDo, toDos, li);
  const labelComponent = label(toDo, li, input);

  div.appendChild(checkboxComponent);
  div.appendChild(labelComponent);
  div.appendChild(button);

  li.appendChild(div);
  li.appendChild(input);

  return li;
};
