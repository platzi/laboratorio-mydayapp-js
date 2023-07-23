function filterUses(taskList, filter) {
  if (filter === "all") {
    return taskList;
  }
  if (filter === "pending") {
    return taskList.filter((task) => task.completed === false);
  }
  if (filter === "completed") {
    return taskList.filter((task) => task.completed === true);
  }
}

function clearCompleted(taskList) {
  taskList = taskList.filter((task) => task.completed !== true);
  return taskList;
}

export { filterUses, clearCompleted };
