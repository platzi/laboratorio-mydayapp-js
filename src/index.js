import "./css/base.css";
import { Controller } from "./js/controller";

class View {
  #controller;
  constructor() {
    this.#controller = new Controller();
    this.elementFooter = document.querySelector(".footer");
    this.elementMain = document.querySelector(".main");
    this.elementMainInput = document.querySelector(".new-todo");
  }
  init() {
    this.render();
  }
  showElement(element, visible) {
    if (visible) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  }
  render() {
    const thereAreTasks = this.#controller.thereAreTasks();
    this.showElement(this.elementFooter, thereAreTasks);
    this.showElement(this.elementMain, thereAreTasks);
  }
}
new View().init();
