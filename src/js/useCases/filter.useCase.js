
function filterUses(taskList, filter) {
  if (filter === "all") {
    return taskList;
  }
  if (filter === "pending") {
    return taskList.filter(task => task.state === "pending");
  }
  if (filter === "completed") {
    return taskList.filter(task => task.state === "completed");
  }
}


function clearCompleted(taskList) {
  taskList = taskList.filter(task => task.state !== "completed");
  return taskList
}


export { filterUses, clearCompleted };
