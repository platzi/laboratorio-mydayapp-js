import Storage from "./Storage";
let storage = new Storage();
export default class ToDo {
  constructor() {}

  init() {}

  addToDoToDom(text, index) {
    const lu = document.querySelector(".todo-list");
    if (!lu) return;
    const liItem = document.createElement("li");
    liItem.setAttribute("id", `li_${index}`);

    const divItem = document.createElement("div");
    divItem.setAttribute("class", "view");

    const inputItem = document.createElement("input");
    inputItem.setAttribute("class", "toggle");
    inputItem.setAttribute("type", "checkbox");
    inputItem.setAttribute("id", `checkbox_${index}`);
    inputItem.addEventListener("click", checkboxEvent);

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

const checkboxEvent = (event) => {
  let idCheckBox = event.target.id;
  let key = getKey("_", idCheckBox);
  let idLi = `li_${key}`;
  let liItem = document.querySelector(`#${idLi}`);
  if (event.srcElement.checked) liItem.setAttribute("class", "completed");
  else liItem.setAttribute("class", "");
  storage.updateStateItem("mydayapp-js", key, event.srcElement.checked);
};

const getKey = (separator, value) => {
  let arrayValues = value.split(separator);
  if (arrayValues === undefined || arrayValues === null) return undefined;
  if (arrayValues.length === 0) return undefined;
  return arrayValues[1];
};
