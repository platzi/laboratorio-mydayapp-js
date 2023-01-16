import Storage from "./storage.js";
import Accounts from "./accounts.js";

let storage = new Storage();
let accounts = new Accounts();
let lu = document.querySelector(".todo-list");
const allList = document.querySelector(".filters li:nth-child(1n) a");
const pendingList = document.querySelector(".filters li:nth-child(2n) a");
const completedList = document.querySelector(".filters li:nth-child(3n) a");
const clearCompleted = document.querySelector(".clear-completed");

const addToDoToDom = (text, index, completed) => {
  if (!lu) return;
  const liItem = document.createElement("li");
  liItem.setAttribute("id", `li_${index}`);
  let className = completed == true ? "completed" : "";
  liItem.setAttribute("class", className);

  const divItem = document.createElement("div");
  divItem.setAttribute("class", "view");

  const inputItem = document.createElement("input");
  inputItem.setAttribute("class", "toggle");
  inputItem.setAttribute("type", "checkbox");
  inputItem.setAttribute("id", `checkbox_${index}`);
  if (completed == true) inputItem.checked = true;
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
  accounts.refreshAccounts("mydayapp-js");
  getNewPart(window.location.href);
  controlToClearCompleted();
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
    if (event.srcElement.value.trim() == "") return;
    let id = storage.registerTask("mydayapp-js", event.srcElement.value);
    addToDoToDom(event.srcElement.value, id, false);
    clearInput(event.srcElement);
    accounts.refreshAccounts("mydayapp-js");
  }
}

function clearCompletedEvent() {
  clearClasses();
  if (!lu) return;
  storage.removeCompletedItems("mydayapp-js");
  loadToDoList();
}

function loadToDoList() {
  clearClasses();
  allList.setAttribute("class", "selected");
  lu.innerHTML = "";
  storage.getStorage("mydayapp-js").forEach((item) => {
    addToDoToDom(item.title, item.id, item.completed);
  });
  accounts.refreshAccounts("mydayapp-js");
  controlToClearCompleted();
}

function loadPendingList() {
  clearClasses();
  lu.innerHTML = "";
  pendingList.setAttribute("class", "selected");
  storage.getPending("mydayapp-js").forEach((item) => {
    addToDoToDom(item.title, item.id, item.completed);
  });
}

function loadCompletedList() {
  clearClasses();
  lu.innerHTML = "";
  completedList.setAttribute("class", "selected");
  storage.getCompleted("mydayapp-js").forEach((item) => {
    addToDoToDom(item.title, item.id, item.completed);
  });
}

function clearClasses() {
  allList.setAttribute("class", "");
  pendingList.setAttribute("class", "");
  completedList.setAttribute("class", "");
}

function urlControl(event) {
  getNewPart(event.newURL);
}

function getNewPart(url) {
  let splitValue = url.split("#/");
  if (splitValue.length === 1) return;
  switch (splitValue[1]) {
    case "completed":
      loadCompletedList();
      break;
    case "":
      loadToDoList();
      break;
    case "pending":
      loadPendingList();
      break;
    default:
      return;
  }
}

function controlToClearCompleted() {
  if (storage.getItemCompleted("mydayapp-js") > 0)
    clearCompleted.setAttribute("style", "");
  else clearCompleted.setAttribute("style", "display:none");
}

export { keyDownEvent, clearCompletedEvent, loadToDoList, urlControl };
