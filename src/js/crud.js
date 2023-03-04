class MyDayApp {
  constructor() {
    this.tasks = [];
    this.generate();
  }

  generate() {
    if (localStorage.getItem("mydayapp-js") !== null) {
      this.tasks = JSON.parse(localStorage.getItem("mydayapp-js"));
    } else if (localStorage === undefined) {
      localStorage.setItem("mydayapp-js", JSON.stringify(this.tasks));
    }
  }

  create(data) {
    let lastTask = this.tasks.findLast((element) => element);
    if (data) {
      this.tasks.push({
        id: (lastTask == undefined ? 0 : Number(lastTask.id) + 1).toString(),
        title: data.trim(),
        completed: false,
      });
      localStorage.setItem("mydayapp-js", JSON.stringify(this.tasks));
    }
  }

  findOne(id) {
    return this.tasks.find(function (task) {
      return task.id === id;
    });
  }

  update(id, changes) {
    if (typeof changes === "boolean") {
      this.findOne(id).completed = changes;
    } else if (typeof changes === "string") {
      this.findOne(id).title = changes;
    }
    localStorage.setItem("mydayapp-js", JSON.stringify(this.tasks));
  }

  delete(id) {
    let index = this.tasks.findIndex(function (task) {
      return id == task.id;
    });
    this.tasks.splice(index, 1);
    localStorage.setItem("mydayapp-js", JSON.stringify(this.tasks));
  }
}

module.exports = MyDayApp;
