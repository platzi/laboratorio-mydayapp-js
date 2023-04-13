import { setCheckBox } from "src/js/UI/CheckBox";
import { deleteTask } from "src/js/UI/DeleteTask";
import { editingMode } from "src/js/UI/EditingMode";

export const template = (taskList) => {
  return taskList.map((taskView) => {
    const { id, title, completed } = taskView;
    //Se crear el elemento li, que ava a contener a todo los demas
    const li = document.createElement("li");
    li.dataset.id = id;
    completed && li.classList.add("completed");
    //Se creo el div, que contien al checkbox, label y el boton de borrar
    const div = document.createElement("div");
    div.classList.add("view");
    //el checkbox
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("toggle");
    completed ? (checkBox.checked = true) : (checkBox.checked = false);
    checkBox.addEventListener("click", setCheckBox);
    //la etiqueta
    const label = document.createElement("label");
    label.innerText = title;
    label.addEventListener("dblclick", editingMode);
    // el boton de eliminar
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("destroy");
    deleteButton.addEventListener("click", deleteTask);
    //el input de editar
    const editInput = document.createElement("input");
    editInput.value = title;
    editInput.classList.add("edit");

    div.append(checkBox, label, deleteButton);
    li.append(div, editInput);
    return li;
  });
};
