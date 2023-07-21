import taskComponet from "../ui/componet/task.component";

const uiList = document.querySelector(".todo-list");

function showTasks(taskList) {
  clearUI();
  taskList.forEach(task => {
    const taskElement = taskComponet(task);
    uiList.appendChild(taskElement);
  })
}
function clearUI() {
  while (uiList.firstChild) {
    uiList.removeChild(uiList.lastChild);
  }
}



export default showTasks;
