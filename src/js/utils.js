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
}

export const addItemEvents = (toDoItems) => {
  const itemElement = document.querySelector(".todo-list").lastElementChild;
  itemElement.querySelector(".toggle").addEventListener("click", () => {
    completeItem(itemElement, toDoItems);
  });
  itemElement.querySelector("label").addEventListener("dblclick", () => {
    itemElement.classList.toggle("editing")
  });
  itemElement.querySelector(".destroy").addEventListener("click", () => {
    destroyItem(itemElement, toDoItems);
  });
  itemElement.querySelector(".edit").addEventListener("keyup", (event) => {
    if(event.key === "Enter" || event.keycode === 13){
      editItem(itemElement, toDoItems);
      itemElement.classList.remove("editing");
    } else if (event.key === "Escape" || event.keycode === 27){
      event.target.value = itemElement.querySelector("label").textContent;
      itemElement.classList.remove("editing");
    }
  });
}

const findItemTitle = (itemElement) => {
  return itemElement.querySelector("label").textContent
}

const findItemNewTitle = (itemElement) => {
  return itemElement.querySelector(".edit").value.trim();
}

const findItemIndex = (title, toDoItems) => {
  return toDoItems.findIndex((item) => item.title === title);
}

const completeItem = (itemElement, toDoItems) => {
  const title = findItemTitle(itemElement);
  const index = findItemIndex(title, toDoItems);
  itemElement.classList.toggle("completed");
  toDoItems[index].completed = toDoItems[index].completed ? false : true;
  pendingItemsCounter(toDoItems.filter((item) => !item.completed).length);
}

const destroyItem = (itemElement, toDoItems) => {
  const title = findItemTitle(itemElement);
  itemElement.remove();
  if(toDoItems.length > 1) {
    const index = findItemIndex(title, toDoItems);
    toDoItems.splice(index, 1);
  } else if(toDoItems.length === 1) {
    toDoItems.pop();
    hideSections();
  }
  pendingItemsCounter(toDoItems.filter((item) => !item.completed).length);
}

const editItem = (itemElement, toDoItems) => {
  const title = findItemTitle(itemElement);
  const newTitle = findItemNewTitle(itemElement);
  if(newTitle.length > 0 && newTitle !== title) {
    const index = findItemIndex(title, toDoItems);
    toDoItems[index].title = newTitle;
    itemElement.querySelector("label").innerHTML = newTitle;
    itemElement.querySelector(".edit").value = newTitle
  }
}

export const clearCompletedItem = (counter, toDoItems) => {
  if(counter > 0) {
      const index = toDoItems.findIndex((item) => item.completed);
      const itemElement = document.querySelector(".todo-list").children[index];
      destroyItem(itemElement, toDoItems);
      clearCompletedItem(counter - 1, toDoItems);
  }
  return;
}
