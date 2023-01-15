export default class ToDo {
  constructor() {}

  init() {}

  addToDoToDom(text) {
    const lu = document.querySelector(".todo-list");
    if (!lu) return;
    const liItem = document.createElement("li");
    liItem.setAttribute("class", "completed");

    const divItem = document.createElement("div");
    divItem.setAttribute("class", "view");

    const inputItem = document.createElement("input");
    inputItem.setAttribute("class", "toggle");
    inputItem.setAttribute("type", "checkbox");

    const labelItem = document.createElement("label");
    labelItem.innerText = text;

    divItem.append(inputItem);
    divItem.append(labelItem);
    liItem.append(divItem);
    lu.append(liItem);

    /*
            <li class="completed">
              <div class="view">
                <input class="toggle" type="checkbox" checked />
                <label>Learn JavaScript</label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="Learn JavaScript" />
            </li>

    */
  }

  clearInput(item) {
    item.value = "";
  }
}
