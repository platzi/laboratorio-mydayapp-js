
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




export { filterUses };
