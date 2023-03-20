import { addItemTemplate, pendingItemsCounter } from "./helpers";

export const navigation = (local_store_key) => {
  const filtersList = document.querySelector(".filters").children;
  console.log(filtersList);
  for (const iterator of filtersList) {
    iterator.lastElementChild.classList.remove("selected");
  }
  if(location.hash.startsWith("#/pending")){
    filtersList[1].lastElementChild.classList.add("selected");
    return JSON.parse(localStorage.getItem(local_store_key)).filter((item) => !item.completed);
  } else if(location.hash.startsWith("#/completed")){
    filtersList[2].lastElementChild.classList.add("selected");
    return JSON.parse(localStorage.getItem(local_store_key)).filter((item) => item.completed);
  } else {
    filtersList[0].lastElementChild.classList.add("selected");
    return JSON.parse(localStorage.getItem(local_store_key));
  }
}

export const showItems = (toDoItems, local_store_key) => {
  document.querySelector(".todo-list").innerHTML = "";
  toDoItems.forEach((item) => {
    addItemTemplate(item);
    addItemEvents(toDoItems, local_store_key);
  });
  pendingItemsCounter(toDoItems.filter((item) => !item.completed).length);
}

export const showSections = () => {
  document.querySelector(".main").classList.remove("hidden");
  document.querySelector(".footer").classList.remove("hidden");
}

export const hideSections = () => {
  document.querySelector(".main").classList.add("hidden");
  document.querySelector(".footer").classList.add("hidden");
}

export const verifyCompletedItems = (toDoItems) => {
  const clearCompletedItemButton = document.querySelector(".clear-completed");
  if(toDoItems.filter((item) => item.completed).length > 0){
    clearCompletedItemButton.classList.remove("hidden");
  } else {
    clearCompletedItemButton.classList.add("hidden");
  }
}

export const createItem = (title) => {
  return {
    id: String(Date.now()),
    title,
    completed: false
  }
}

export const addItem = (title, toDoItems, local_store_key) => {
  const item = createItem(title);
  if(toDoItems.length === 0) {
    showSections();
  }
  toDoItems.push(item);
  setItemToLocalStorage(toDoItems, local_store_key);
  addItemTemplate(item);
  addItemEvents(toDoItems, local_store_key);
  document.querySelector(".new-todo").value = null;
  pendingItemsCounter(toDoItems.filter((item) => !item.completed).length);
}

export const addItemEvents = (toDoItems, local_store_key) => {
  const itemElement = document.querySelector(".todo-list").lastElementChild;
  itemElement.querySelector(".toggle").addEventListener("click", () => {
    completeItem(itemElement, toDoItems, local_store_key);
    verifyCompletedItems(toDoItems);
  });
  itemElement.querySelector("label").addEventListener("dblclick", () => {
    itemElement.classList.toggle("editing")
  });
  itemElement.querySelector(".destroy").addEventListener("click", () => {
    destroyItem(itemElement, toDoItems, local_store_key);
    verifyCompletedItems(toDoItems);
  });
  itemElement.querySelector(".edit").addEventListener("keyup", (event) => {
    if(event.key === "Enter" || event.keycode === 13){
      editItem(itemElement, toDoItems, local_store_key);
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

const completeItem = (itemElement, toDoItems, local_store_key) => {
  const title = findItemTitle(itemElement);
  const index = findItemIndex(title, toDoItems);
  itemElement.classList.toggle("completed");
  toDoItems[index].completed = toDoItems[index].completed ? false : true;
  setItemToLocalStorage(toDoItems, local_store_key);
  pendingItemsCounter(toDoItems.filter((item) => !item.completed).length);
}

const destroyItem = (itemElement, toDoItems, local_store_key) => {
  const title = findItemTitle(itemElement);
  itemElement.remove();
  if(toDoItems.length > 1) {
    const index = findItemIndex(title, toDoItems);
    toDoItems.splice(index, 1);
  } else if(toDoItems.length === 1) {
    toDoItems.pop();
    hideSections();
  }
  setItemToLocalStorage(toDoItems, local_store_key);
  pendingItemsCounter(toDoItems.filter((item) => !item.completed).length);
}

const editItem = (itemElement, toDoItems, local_store_key) => {
  const title = findItemTitle(itemElement);
  const newTitle = findItemNewTitle(itemElement);
  if(newTitle.length > 0 && newTitle !== title) {
    const index = findItemIndex(title, toDoItems);
    toDoItems[index].title = newTitle;
    setItemToLocalStorage(toDoItems, local_store_key);
    itemElement.querySelector("label").innerHTML = newTitle;
    itemElement.querySelector(".edit").value = newTitle
  }
}

export const clearCompletedItem = (counter, toDoItems, local_store_key) => {
  if(counter > 0) {
      const index = toDoItems.findIndex((item) => item.completed);
      const itemElement = document.querySelector(".todo-list").children[index];
      destroyItem(itemElement, toDoItems, local_store_key);
      clearCompletedItem(counter - 1, toDoItems, local_store_key);
  }
  return;
}

const setItemToLocalStorage = (toDoItems, local_store_key) => {
  localStorage.setItem(local_store_key, JSON.stringify(toDoItems));
}
