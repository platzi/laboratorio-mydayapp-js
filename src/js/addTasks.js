import { counter } from "./counter";
import { btnClearCompleted } from "./btnClearCompleted";
import { listTaks } from "..";

const input_new_todo = document.querySelector(".new-todo");
const todo_list = document.querySelector(".todo-list");
const main = document.querySelector(".main");

const footer = document.querySelector(".footer");

export function addTasks(taks) {
  inactiveMainOrFooter(taks);

  todo_list.innerHTML = "";
  input_new_todo.value = "";

  taks.forEach((element) => {
    const li = document.createElement("li");
    li.classList.add("pending");
    const div = document.createElement("div");
    div.classList.add("view");

    const input_cheekbox = document.createElement("input");
    input_cheekbox.type = "checkbox";
    input_cheekbox.classList.add("toggle");

    const label = document.createElement("label");
    label.textContent = element.name;

    const button_delete = document.createElement("button");
    button_delete.classList.add("destroy");

    if (element.completed) {
      input_cheekbox.checked = true;
      li.classList.add("completed");
      li.classList.remove("pending");
      btnClearCompleted();
    }

    input_cheekbox.addEventListener("change", (event) => {
      const li = event.target.parentNode.parentNode; //.parentNode=DIV;.parentNode.parentNode=LI
      if (event.target.checked) {
        li.classList.remove("pending");
        element.completed = true;
        li.classList.add("completed");
        btnClearCompleted();
        localStorage.setItem("mydayapp-js", JSON.stringify(listTaks));
      } else {
        element.completed = false;
        li.classList.remove("completed");
        li.classList.add("pending");
        localStorage.setItem("mydayapp-js", JSON.stringify(listTaks));
        btnClearCompleted();
      }
    });

    label.addEventListener("dblclick", (event) => {
      const li = event.target.parentNode.parentNode;
      li.classList.add("editing");
      const input_edit = li.lastChild;
      input_edit.focus();

      const li_all = document.querySelectorAll(".todo-list li");

      Array.from(li_all).forEach((li) => {
        if (!li.classList.contains("editing")) {
          li.classList.add("inactive");
        }
      });

      input_edit.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          const newLabel = input_edit.value.trim();
          label.textContent = newLabel;
          input_edit.value = newLabel; //update input Edit
          input_edit.setAttribute("value", newLabel);
          li.classList.remove("editing");

          Array.from(li_all).forEach((li) => {
            li.classList.remove("inactive");
          });

          const index = taks.indexOf(element); //find INDEX
          taks[index].name = newLabel;
          localStorage.setItem("mydayapp-js", JSON.stringify(listTaks));
        } else if (event.key === "Escape") {
          input_edit.value = label.textContent; //label of doble click
          li.classList.remove("editing");

          Array.from(li_all).forEach((li) => {
            li.classList.remove("inactive");
          });
        }
      });
    });

    button_delete.addEventListener("click", () => {
      const index = taks.indexOf(element);
      taks.splice(index, 1);
      const li = button_delete.parentNode.parentNode;
      todo_list.removeChild(li);
      localStorage.setItem("mydayapp-js", JSON.stringify(listTaks));

      inactiveMainOrFooter(taks);
      counter();
      btnClearCompleted();
    });

    const input_edit = document.createElement("input");
    input_edit.classList.add("edit");
    input_edit.setAttribute("value", element.name);
    div.append(input_cheekbox, label, button_delete);
    li.append(div, input_edit);

    todo_list.append(li);

    counter();
  });
}

function inactiveMainOrFooter(m_tasks) {
  if (m_tasks.length <= 0) {
    main.classList.add("inactive");
    // footer.classList.add("inactive");
  } else {
    main.classList.remove("inactive");
    // footer.classList.remove("inactive");
  }
}
