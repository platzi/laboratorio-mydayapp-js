const createTasks = () => {
  let tasksList = [];
  return {
    addTask(newTask) {
      tasksList.push(newTask);
      return "Todo agregado exitosamente", newTask;
    },
    removeTask(id) {
      tasksList = tasksList.filter((task) => task.id !== Number(id));
      return "Elemento Eliminado con exito", id;
    },
    getTasks() {
      return tasksList;
    },
    getLastTaskId() {
      return tasksList[tasksList.length - 1]?.id;
    },
    getPendingTasks() {
      return tasksList.filter((task) => !task.completed);
    },
    getCompletedTasks() {
      return tasksList.filter((task) => task.completed);
    },
    toggleCompleted(id) {
      let index;
      index = tasksList.findIndex((task) => task.id === Number(id));
      tasksList[index].completed = !tasksList[index].completed;
    },
    updateTask(id, updates) {
      const index = tasksList.findIndex((task) => task.id === Number(id));
      tasksList[index] = { ...tasksList[index], title: updates };
      return "Tarea actualizada con exito", updates, tasksList;
    },
    clearTaskCompleted() {
      tasksList = tasksList.filter((task) => !task.completed);
    },
  };
};

export const taskPlanner = createTasks();
