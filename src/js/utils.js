import { addItemTemplate, pendingItemsCounter } from "./helpers";

export const sayHello = (text) => {
  return text;
};

export const showSections = () => {
  document.querySelector(".main").classList.remove("hidden");
  document.querySelector(".footer").classList.remove("hidden");
}

export const hideSections = () => {
  document.querySelector(".main").classList.add("hidden");
  document.querySelector(".footer").classList.add("hidden");
}

export const createItem = (title) => {
  return {
    id: String(Date.now()),
    title,
    completed: false
  }
}



export const addItem = (title, toDoItems) => {
  const item = createItem(title);
  if(toDoItems.length === 0) {
    showSections();
  }
  toDoItems.push(item);
  addItemTemplate(item);
  addItemEvents(toDoItems);
  document.querySelector(".new-todo").value = null;
  pendingItemsCounter(toDoItems.filter((item) => !item.completed).length);
  console.log(toDoItems);
}

export const addItemEvents = (toDoItems) => {
  const itemElement = document.querySelector(".todo-list").lastElementChild;
  const title = itemElement.querySelector("label").textContent;
  const index = toDoItems.findIndex((item) => item.title === title);
  itemElement.querySelector(".toggle").addEventListener("click", (event) => completeItem(itemElement, index, toDoItems));
  itemElement.querySelector("label").addEventListener("dblclick", (event) => itemElement.classList.toggle("editing"));
  itemElement.querySelector(".destroy").addEventListener("click", (event) => destroyItem(itemElement, index, toDoItems));
  itemElement.querySelector(".edit").addEventListener("keyup", (event) => {
    const element = event.target;
    if(event.key === "Enter" || event.keycode === 13){
      editItem(itemElement, index, toDoItems);
    } else if (event.key === "Escape" || event.keycode === 27){
      element.value = title;
      itemElement.classList.remove("editing");
    }
  });
}

const completeItem = (itemElement, index, toDoItems) => {
  itemElement.classList.toggle("completed");
  toDoItems[index].completed = toDoItems[index].completed ? false : true;
  pendingItemsCounter(toDoItems.filter((item) => !item.completed).length);
  console.log(toDoItems);
}

const destroyItem = (itemElement, index, toDoItems) => {
  itemElement.remove();
  if(toDoItems.length > 1) {
    toDoItems.splice(index, 1);
  } else if(toDoItems.length === 1) {
    toDoItems.pop();
    hideSections();
  }
  pendingItemsCounter(toDoItems.filter((item) => !item.completed).length);
  console.log(toDoItems);
}

const editItem = (itemElement, index, toDoItems) => {
  const itemLabel = itemElement.querySelector("label");
  const itemInput = itemElement.querySelector(".edit");
  const title = itemLabel.textContent;
  const newTitle = itemInput.value.trim();
  if(newTitle.length > 0 && newTitle !== title) {
    toDoItems[index].title = newTitle;
    itemLabel.innerHTML = newTitle;
    itemInput.value = newTitle;
  }
  itemElement.classList.remove("editing");
  console.log(toDoItems);
}

