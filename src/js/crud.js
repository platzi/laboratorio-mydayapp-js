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
}

module.exports = MyDayApp;
