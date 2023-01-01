import { checkStorage, updateTodo } from "./store";

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

export const render = () => {
  //Limpiamos el DOCM
  showTag();
  document.querySelector(".todo-list").innerHTML = "";
  const storage = checkStorage();
  const list = document.querySelector(".todo-list");
  const liItems = [];
  let itemLeft = 0;
  storage.map((item, index) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.classList.add("view");
    const input = document.createElement("input");
    input.addEventListener("click", (e) => {
      updateTodo(e.target.classList[1]);
    });
    input.classList.add("toggle", index);
    input.setAttribute("type", "checkbox");
    if (item.state === "completed") {
      li.classList.add("completed");
      input.checked = true;
    } else {
      itemLeft++;
    }
    const label = document.createElement("label");
    label.innerHTML = item.todo;
    const button = document.createElement("button");
    button.classList.add("destroy");
    div.append(input, label, button);
    const inputToEdit = document.createElement("input");
    inputToEdit.classList.add("edit");
    inputToEdit.setAttribute("value", item.todo);
    li.append(div, inputToEdit);
    liItems.push(li);
  });
  document.querySelector(".todo-count").children[0].innerHTML = itemLeft;
  list.append(...liItems);
};
