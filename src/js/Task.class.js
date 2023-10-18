export default class Task {
  constructor({ id, title, completed = false }) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
  toggleState() {
    this.completed = !this.completed;
  }
  setTitle(title) {
    this.title = title;
  }
}
