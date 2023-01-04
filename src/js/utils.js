import { checkStorage, updateTodoState, deleteTodo, updateTodo } from "./store";

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
  input.addEventListener("click", () => {
    updateTodoState(index);
  });
  div.classList.add("view");

  input.classList.add("toggle");
  input.setAttribute("type", "checkbox");

  if (el.completed) {
    li.classList.add("completed");
    input.checked = true;
  } else {
    data.itemLeft++;
  }
  const label = document.createElement("label");
  const button = document.createElement("button");

  label.addEventListener("dblclick", () => {
    li.classList.add("editing");
  });
  label.innerHTML = el.title;
  button.classList.add("destroy");

  button.addEventListener("click", () => {
    deleteTodo(index);
  });
  div.append(input, label, button);

  const inputToEdit = document.createElement("input");

  inputToEdit.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && !!e.target.value.trim().length) {
      updateTodo(index, e.target.value.trim());
    }
  });
  inputToEdit.classList.add("edit");
  inputToEdit.setAttribute("value", el.title);
  li.append(div, inputToEdit);
  return li;
};

export const render = (type = "all") => {
  //Limpiamos el DOCM
  showTag();
  document.querySelector(".todo-list").innerHTML = "";
  const storage = checkStorage();
  const list = document.querySelector(".todo-list");
  const data = {
    itemLeft: 0,
    liItems: [],
  };
  if (type === "all") {
    storage.map((item, index) => {
      data.liItems.push(createElement(item, index, data));
    });
  } else if (type === "pending") {
    storage.map((item, index) => {
      if (!item.completed) data.liItems.push(createElement(item, index, data));
    });
  } else {
    storage.map((item, index) => {
      if (item.completed) data.liItems.push(createElement(item, index, data));
      else data.itemLeft++;
    });
  }
  document.querySelector(".todo-count").children[0].innerHTML = data.itemLeft;
  list.append(...data.liItems);
};
