export const sayHello = (text) => {
  return text;
};

const mainSection = document.getElementById("main");
const footer = document.getElementById("footer");

export function GetTasks() {
  const TaskList = JSON.parse(localStorage.getItem("Task-List"));

  if (TaskList) {
    return TaskList;
  } else {
    return {};
  }
}

export function SetTask(Task) {
  const Tasks = GetTasks();
  Tasks[Task.id] = Task;

  localStorage.setItem("Task-List", JSON.stringify(Tasks));
}

export function RenderTasks() {
  const TaskList = GetTasks();

  if (Object.keys(TaskList).length === 0) {
    mainSection.style.display = "none";
    footer.style.display = "none";
  }
}
