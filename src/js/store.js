export default class Store {
  _tasks = [];
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    if (!localStorage.getItem(localStorageKey))
      localStorage.setItem(localStorageKey, "[]");
    this._tasks = JSON.parse(localStorage.getItem(localStorageKey));
  }

  getTasks() {
    return this._tasks;
  }

  pendingTasks() {
    return this._tasks.filter((t) => !t.completed);
  }

  completedTasks() {
    return this._tasks.filter((t) => t.completed);
  }

  pendingTasksSize() {
    return this._tasks.filter((t) => !t.completed).length;
  }

  find(id) {
    const task = this._taskstasks.find((t) => t.id.toString() === id);
    return task;
  }

  insert({ id = Date.now().toString(), title, completed = false }) {
    this._tasks.push({ id, title, completed });
    this._updateLocalStorage();
  }

  remove(id) {
    const index = this._tasks.findIndex((t) => t.id.toString() === id);
    if (index === -1) return;
    this._tasks.splice(index, 1);
    this._updateLocalStorage();
  }

  update(id, task) {
    const index = this._tasks.findIndex((t) => t.id.toString() === id);
    if (index === -1) return;
    this._tasks[index] = { ...this._tasks[index], ...task };
    this._updateLocalStorage();
  }

  toggleTask(id) {
    const task = this._tasks.find((t) => t.id.toString() === id);
    if (!task) return;
    task.completed = !task.completed;
    this._updateLocalStorage();
  }

  removeCompletedTasks() {
    const newTasks = this._tasks.filter((t) => !t.completed);
    this._tasks = newTasks;
    this._updateLocalStorage();
  }

  count() {
    return this._tasks.length;
  }

  _updateLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this._tasks));
  }
}
