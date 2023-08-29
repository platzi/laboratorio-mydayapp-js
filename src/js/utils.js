export const sayHello = (text) => {
  return text;
};

const mainSection = document.getElementById("main");
const footer = document.getElementById("footer");
const todoList = document.querySelector(".todo-list");
const todoCount = document.querySelector(".todo-count");

export function GetTasks() {
  const TaskList = localStorage.getItem("mydayapp-js");

  if (TaskList) {
    return JSON.parse(TaskList);
  } else {
    return [];
  }
}

function SaveTasks(Tasks) {
  localStorage.setItem("mydayapp-js", JSON.stringify(Tasks));
  RenderTasks();
  CountPendingTasks();
}

export function SetTask(Task) {
  let TasksList = GetTasks();
  if (TasksList.length > 0) {
    TasksList = [...TasksList, Task];
  } else {
    TasksList = [Task];
  }

  SaveTasks(TasksList);
}

function ToggleStateTask(id) {
  const TasksList = GetTasks();
  TasksList[id].completed = TasksList[id].completed !== true;
  SaveTasks(TasksList);
}

function ChangeTaskTitle(id, title) {
  const TasksList = GetTasks();
  console.log(TasksList[id]);
  TasksList[id].title = title;
  SaveTasks(TasksList);
}

function DeleteTask(id) {
  const TasksList = GetTasks();
  console.log(id);
  if (TasksList.length > 1) {
    TasksList.splice(id, 1);
  } else {
    TasksList.pop();
    console.log("Popeado", TasksList);
  }
  SaveTasks(TasksList);
}

export function RenderTasks() {
  const TaskList = GetTasks();

  todoList.innerHTML = "";
  if (TaskList.length <= 0) {
    mainSection.style.display = "none";
    footer.style.display = "none";
  } else {
    mainSection.style.display = "block";
    footer.style.display = "block";
    TaskList.sort((a, b) => a.id - b.id).forEach((task) => {
      const taskItem = document.createElement("li");
      const taskView = document.createElement("div");
      taskView.classList.add("view");

      const taskInput = document.createElement("input");
      taskInput.classList.add("toggle");
      taskInput.type = "checkbox";
      task.completed ? (taskInput.checked = true) : (taskInput.checked = false);
      taskInput.addEventListener("click", () => ToggleStateTask(task.id));

      const taskLabel = document.createElement("label");
      taskLabel.innerText = task.title;
      taskLabel.addEventListener("dblclick", () => {
        taskItem.classList.add("editing");
        taskEditInput.value = task.title;
        taskEditInput.focus();
      });

      const taskButton = document.createElement("button");
      taskButton.classList.add("destroy");
      taskButton.addEventListener("click", () => DeleteTask(task.id));

      taskView.append(taskInput, taskLabel, taskButton);

      const taskEditInput = document.createElement("input");
      taskEditInput.classList.add("edit");
      taskEditInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          ChangeTaskTitle(task.id, taskEditInput.value.trim());
          taskItem.classList.remove("editing");
        } else if (e.key === "Escape") {
          taskItem.classList.remove("editing");
        }
      });

      taskItem.append(taskView, taskEditInput);
      todoList.appendChild(taskItem);

      if (task.completed === true) {
        taskItem.classList.add("completed");
      }
    });
  }
}

export function CountPendingTasks() {
  const TasksList = GetTasks();

  todoCount.innerHTML = "";

  const numberOfTasks = document.createElement("strong");
  numberOfTasks.innerText = TasksList.length.toString();

  todoCount.append(numberOfTasks);
  TasksList.length > 1
    ? (todoCount.innerText += " items left")
    : (todoCount.innerText += " item left");
}
