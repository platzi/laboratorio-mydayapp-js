import "./css/base.css";

const footer = document.querySelector("footer");
const list = document.querySelector(".todo-list");
const main = document.querySelector(".main");
const input = document.querySelector(".new-todo");

if (list.childElementCount === 0) {
  footer.style.display = "none";
  main.style.display = "none";
}

function checked(input) {
  if (input.checked) {
    input.parentElement.parentElement.classList.add("completed");
  } else {
    input.parentElement.parentElement.classList.remove("completed");
  }
}

function edit(label) {
  label.parentElement.parentElement.classList.add("editing");
  label.parentElement.nextSibling.focus();
}

function editFinished(input) {
  const text = input.target.value.trim();
  if (input.key === "Enter") {
    if (input.target.value !== "") {
      input.target.previousSibling.childNodes[1].textContent = text;
      input.target.parentElement.classList.remove("editing");
    }
  }
  if (input.key === "Escape") {
    input.target.parentElement.classList.remove("editing");
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    footer.style.display = "block";
    main.style.display = "block";
    const title = input.value;
    const trimmedTitle = title.trim();
    if (trimmedTitle !== "") {
      const newtodo = createTodo(trimmedTitle);
      list.appendChild(newtodo);
    }
    input.value = "";
  }
});

function createTodo(title) {
  let todo = document.createElement("li");
  let div = document.createElement("div");
  div.classList.add("view");
  let mark = document.createElement("input");
  mark.type = "checkbox";
  mark.classList.add("toggle");
  mark.onclick = (e) => {
    checked(e.target);
  };
  let label = document.createElement("label");
  label.innerText = title;
  label.ondblclick = (e) => {
    edit(e.target);
  };
  let destroy = document.createElement("button");
  destroy.classList.add("destroy");
  let hiddenInput = document.createElement("input");
  hiddenInput.classList.add("edit");
  hiddenInput.value = title;
  hiddenInput.onkeydown = (e) => {
    editFinished(e);
  };
  div.appendChild(mark);
  div.appendChild(label);
  div.appendChild(destroy);
  todo.appendChild(div);
  todo.appendChild(hiddenInput);
  return todo;
}
