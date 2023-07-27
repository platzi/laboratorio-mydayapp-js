export const createTaskItem = function (task) {
  const listItem = document.createElement("li");
  const listItemView = document.createElement("div");
  const listItemToggle = document.createElement("input");
  const listItemTitle = document.createElement("label");
  const listItemDestroy = document.createElement("button");
  const listItemInputEdit = document.createElement("input");

  listItem.className = task.completed ? "completed" : "";
  listItem.dataset.id = task.id;
  listItemView.className = "view";
  listItemToggle.className = "toggle";
  listItemToggle.type = "checkbox";
  listItemToggle.checked = task.completed;
  listItemTitle.textContent = task.title;
  listItemDestroy.className = "destroy";
  listItemInputEdit.className = "edit";
  listItemInputEdit.value = task.title;

  listItem.append(listItemView, listItemInputEdit);
  listItemView.append(listItemToggle, listItemTitle, listItemDestroy);

  return listItem;
};
