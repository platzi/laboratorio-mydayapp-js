export class Task {
  #id;
  #title;
  #completed;
  constructor(id, title, completed = false) {
    this.#id = id;
    this.#title = title;
    this.#completed = completed;
  }
  get id() {
    return this.#id;
  }
  get title() {
    return this.#title;
  }
  set title(title) {
    this.#title = title;
  }
  isCompleted() {
    return this.#completed;
  }
  markAsCompleted() {
    this.#completed = true;
  }
  markAsPending() {
    this.#completed = false;
  }
  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      completed: this.#completed,
    };
  }
}
