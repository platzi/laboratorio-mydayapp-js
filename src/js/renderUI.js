import { taskListArray, deleteTask, checkBox } from "./addTodoList";
import { verifyTaskLIstArray } from "./events";
import { todoListContainer, todoCount } from "./nodes";

export function renderUI() {
  todoListContainer.innerHTML = "";
  verifyTaskLIstArray();
  const container = [];
  taskListArray.forEach((task) => {
    const liContainer = template(task);
    container.push(liContainer);
  });
  todoListContainer.append(...container);
  itemLeft()
};

//template
function template(task) {
  const liContainer = document.createElement("li");
  const divView = document.createElement("div");
  const inputCheckBox = document.createElement("input");
  const labelTask = document.createElement("label");
  const btnDestroy = document.createElement("button");
  const inputEdit = document.createElement("input");
  liContainer.dataset.id = task.id;
  divView.classList.add("view");
  inputCheckBox.classList.add("toggle");
  inputCheckBox.addEventListener("click", checkBox);
  inputCheckBox.type = "checkbox";

  if (task.status === "completed") {
    inputCheckBox.checked = true;
    liContainer.classList.add("completed");
  } else if (task.status === "pending") {
    inputCheckBox.checked = false;
    liContainer.classList.remove("completed");
  }

  labelTask.innerText = task.todoName;
  btnDestroy.classList.add("destroy");
  btnDestroy.addEventListener("click", deleteTask);
  inputEdit.classList.add("edit");
  divView.append(inputCheckBox, labelTask, btnDestroy);
  liContainer.append(divView, inputEdit);
  return liContainer;
}

function itemLeft() {
  let item;
  taskListArray.length > 1 ? (item = "items") : (item = "item");
  todoCount.innerHTML = `<strong>${taskListArray.length}</strong> ${item} left`;
}
