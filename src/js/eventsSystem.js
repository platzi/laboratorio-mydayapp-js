import {
  listGenerator,
  listFilter,
  footerSelectedControl,
} from "./renderutilities";
const newInputHandler = (store) => {
  //new_input handler
  const new_input = document.querySelector(".new-todo");
  new_input.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      const title = e.target.value.trim();
      if (title.length == 0) {
        window.alert("the text must be at least 1 character long");
        return;
      } else {
        store.addItem(title);
        e.target.value = "";
      }
    }
  });
};

const tasksEvents = (store) => {
  // get tasks on page
  const tasks = document.querySelectorAll(".todo-list li");

  //global esc event to close all editing fields
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      tasks.forEach((task) => {
        const inputfield = task.querySelector(".edit");
        const originalvalue = task.querySelector("label").innerHTML;
        inputfield.value = originalvalue;
        task.classList.remove("editing");
      });
    }
  });

  //itereate over each task to add events
  tasks.forEach((task) => {
    //double click on label editing event
    const label = task.querySelector("label");
    const inputfield = task.querySelector(".edit");
    label.addEventListener("dblclick", () => {
      task.classList.add("editing");
      inputfield.focus();
    });

    //enter finalize editing event
    inputfield.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        store.editItem(task.id, e.target.value.trim());
      }
    });

    //checkbox events
    const checkbox = task.querySelector(".toggle");
    checkbox.addEventListener("click", () => {
      store.switchItemState(task.id);
    });
    // delete event
    const deleteButton = task.querySelector(".destroy");
    deleteButton.addEventListener("click", () => {
      store.deleteItem(task.id);
    });
  });
};

const cleanEvent = (store) => {
  const cleanbutton = document.querySelector(".clear-completed");
  cleanbutton.addEventListener("click", () => {
    store.cleanCompletes();
  });
};

const saveStateBeforeExit = (store) => {
  window.addEventListener("beforeunload", () => {
    store.saveList();
  });
};

const hashChange = (list) => {
  window.addEventListener("hashchange", () => {
    listGenerator(listFilter(list));
    footerSelectedControl();
  });
};

export {
  newInputHandler,
  tasksEvents,
  cleanEvent,
  saveStateBeforeExit,
  hashChange,
};
