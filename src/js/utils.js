export const sayHello = (text) => {
  return text;
};

const mainSection = document.getElementById("main");
const footer = document.getElementById("footer");
const todoList = document.querySelector(".todo-list");

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

function ToggleStateTask(id) {
  const TaskList = GetTasks();
  TaskList[id].completed = TaskList[id].completed !== true;

  SetTask(TaskList[id]);
}

export function RenderTasks() {
  const TaskList = GetTasks();

  todoList.innerHTML = "";

  if (Object.keys(TaskList).length === 0) {
    mainSection.style.display = "none";
    footer.style.display = "none";
  } else {
    Object.entries(TaskList).forEach((task) => {
      const taskItem = document.createElement("li");

      const taskView = document.createElement("div");
      taskView.classList.add("view");

      const taskInput = document.createElement("input");
      taskInput.classList.add("toggle");
      taskInput.type = "checkbox";
      taskInput.addEventListener("click", () => {
        ToggleStateTask(task[1].id);
        RenderTasks();
      });

      const taskLabel = document.createElement("label");
      taskLabel.innerText = task[1].title;
      taskLabel.addEventListener("dblclick", () => {
        taskItem.classList.add("editing");
        taskEditInput.value = task[1].title;
        taskEditInput.focus();
      });

      const taskButton = document.createElement("button");
      taskButton.classList.add("destroy");

      taskView.append(taskInput, taskLabel, taskButton);

      const taskEditInput = document.createElement("input");
      taskEditInput.classList.add("edit");
      taskEditInput.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
          task[1].title = taskEditInput.value.trim();
          SetTask(task[1]);
          taskItem.classList.remove("editing");
          RenderTasks();
        } else if (e.keyCode === 27) {
          taskItem.classList.remove("editing");
        }
      });

      taskItem.append(taskView, taskEditInput);
      todoList.appendChild(taskItem);

      if (task[1].completed === true) {
        taskItem.classList.add("completed");
      }
    });
  }
}
