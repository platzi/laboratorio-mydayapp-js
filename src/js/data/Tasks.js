const createTasks = () => {
  let tasksList = [];
  return {
    addTask(newTask) {
      tasksList.push(...newTask);
      return "Todo agregado exitosamente";
    },
    removeTask(id) {
      tasksList = tasksList.filter((task) => task.id !== id);
    },
    getTasks() {
      return tasksList;
    },
    getPendingTasks() {
      return tasksList.filter((task) => !task.completed);
    },
    getCompletedTasks() {
      return tasksList.filter((task) => task.completed);
    },
    toggleCompleted(id) {
      let index;
      index = tasksList.findIndex((task) => task.id === id);
      tasksList[index].completed = !tasksList[index].completed;
    },
    updateTask(id, updates) {
      const index = tasksList.findIndex((task) => task.id === id);
      tasksList[index] = { ...tasksList[index], ...updates };
    },
    clearTaskCompleted() {
      tasksList = tasksList.filter((task) => !task.completed);
    },
  };
};

export const taskPlanner = createTasks();
