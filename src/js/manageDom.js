import Storage from "./Storage";
import Accounts from "./Accounts";

let storage = new Storage();
let accounts = new Accounts();
let lu = document.querySelector(".todo-list");

const addToDoToDom = (text, index, completed) => {
  if (!lu) return;
  const liItem = document.createElement("li");
  liItem.setAttribute("id", `li_${index}`);
  let className = completed === true ? "completed" : "";
  liItem.setAttribute("class", className);

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
};

const clearInput = (item) => {
  item.value = "";
};

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

function keyDownEvent(event) {
  if (event.which === 13) {
    let id = storage.registerTask("mydayapp-js", event.srcElement.value);
    addToDoToDom(event.srcElement.value, id, false);
    clearInput(event.srcElement);
    accounts.refreshAccounts("mydayapp-js");
  }
}

function clearCompletedEvent(event) {
  if (!lu) return;
  lu.innerHTML = "";
  storage.removeCompletedItems("mydayapp-js");
  storage.getStorage("mydayapp-js").forEach((item) => {
    addToDoToDom(item.title, item.id, item.state);
  });
  event.srcElement.setAttribute("style", "display:none");
}

export { keyDownEvent, clearCompletedEvent };
