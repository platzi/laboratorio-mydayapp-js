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
    labelItem.setAttribute("id", `label_${index}`);
    labelItem.addEventListener("click", labelEvent);

    const buttonItem = document.createElement("button");
    buttonItem.setAttribute("class", "destroy");

    const inputEditItem = document.createElement("input");
    inputEditItem.setAttribute("class", "edit");
    inputEditItem.setAttribute("id", `inputEdit_${index}`);
    inputEditItem.addEventListener("keydown", inputEditEvent);
    inputEditItem.value = text;

    divItem.append(inputItem);
    divItem.append(labelItem);
    divItem.append(buttonItem);
    liItem.append(divItem);
    liItem.append(inputEditItem);
    lu.append(liItem);
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
  storage.updateStateItem(
    "mydayapp-js",
    key,
    event.srcElement.checked,
    undefined
  );
};

const labelEvent = (event) => {
  let idLabel = event.target.id;
  let key = getKey("_", idLabel);
  let idLi = `li_${key}`;
  let liItem = document.querySelector(`#${idLi}`);
  liItem.setAttribute("class", "editing");
};

const inputEditEvent = (event) => {
  if (event.which === 13) {
    let idEditInput = event.target.id;
    let key = getKey("_", idEditInput);
    let idLi = `li_${key}`;
    let idLabel = `label_${key}`;
    let liItem = document.querySelector(`#${idLi}`);
    let labelItem = document.querySelector(`#${idLabel}`);
    labelItem.innerText = event.srcElement.value;
    liItem.setAttribute("class", "");
    storage.updateStateItem(
      "mydayapp-js",
      key,
      undefined,
      event.srcElement.value
    );
  }
};

const getKey = (separator, value) => {
  let arrayValues = value.split(separator);
  if (arrayValues === undefined || arrayValues === null) return undefined;
  if (arrayValues.length === 0) return undefined;
  return arrayValues[1];
};
