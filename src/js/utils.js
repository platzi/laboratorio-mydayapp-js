import { checkStorage, updateTodo, deleteTodo } from "./store";

const app = {
  footer: document.querySelector(".footer"),
  main: document.querySelector(".main"),
};

export const showTag = () => {
  app.footer.style.display = "block";
  app.main.style.display = "block";
};

export const hiddenTag = () => {
  app.footer.style.display = "none";
  app.main.style.display = "none";
};

const createElement = (el, index, data) => {
  const li = document.createElement("li");
  const div = document.createElement("div");

  const input = document.createElement("input");
  input.addEventListener("click", (e) => {
    updateTodo(e.target.classList[1]);
  });
  div.classList.add("view");

  input.classList.add("toggle", index);
  input.setAttribute("type", "checkbox");

  if (el.state === "completed") {
    li.classList.add("completed");
    input.checked = true;
  } else {
    data.itemLeft++;
  }
  const label = document.createElement("label");
  const button = document.createElement("button");

  label.innerHTML = el.todo;
  button.classList.add("destroy", index);

  button.addEventListener("click", (e) => {
    deleteTodo(e.target.classList[1]);
  });
  div.append(input, label, button);

  const inputToEdit = document.createElement("input");
  inputToEdit.classList.add("edit");
  inputToEdit.setAttribute("value", el.todo);
  li.append(div, inputToEdit);
  return li;
};

export const render = () => {
  //Limpiamos el DOCM
  showTag();
  document.querySelector(".todo-list").innerHTML = "";
  const storage = checkStorage();
  const list = document.querySelector(".todo-list");
  const data = {
    itemLeft: 0,
    liItems: [],
  };
  storage.map((item, index) => {
    data.liItems.push(createElement(item, index, data));
  });
  document.querySelector(".todo-count").children[0].innerHTML = data.itemLeft;
  list.append(...data.liItems);
};
