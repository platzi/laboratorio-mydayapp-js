import { setCheckBox } from "../UI/CheckBox";
import { deleteTask } from "../UI/DeleteTask";
import { editingMode } from "../UI/EditingMode";

export const template = (taskList) => {
  return taskList
    .map((taskView) => {
      const { id, title, completed } = taskView;
      const isCompletedClass = completed && "completed";
      const isCompletedCheck = completed && "checked";
      return `<li data-id=${id}}>
    <div class="view">
      <input class="toggle ${isCompletedClass}" type="checkbox" onClick="${setCheckBox()}" ${isCompletedCheck}>
      <label ondblclick="${editingMode()}">${title}</label>
      <button class="destroy" onClick="${deleteTask()}"></button>
    </div>
    <input class="edit">
  </li>`;
    })
    .join("");
};
