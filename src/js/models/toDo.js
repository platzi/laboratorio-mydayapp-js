export class ToDo {
  constructor(title, id = null, completed = false) {
    this.id = id ? id : ToDo.generateId();
    this.title = title;
    this.completed = completed;
  }

  update(payload) {
    if (payload.title) {
      this.title = payload.title;
    }
    if (payload.completed !== undefined) {
      this.completed = payload.completed;
    }
  }

  static generateId() {
    const timestamp = new Date().getTime();
    const firstRandomPart = Math.floor(Math.random() * 100);
    const secondRandomPart = Math.floor(Math.random() * 100);

    return `${firstRandomPart}${timestamp}${secondRandomPart}`;
  }
}
