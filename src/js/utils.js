export const sayHello = (text) => {
  return text;
};

export const checkItems = () => {
  const items = getStorage();
  if (!items || items.length === 0) {
    document.addEventListener("DOMContentLoaded", hideContent);
    showClearButton(items || []);
  } else {
    renderItems(items);
    updateTotalTasks(items);
    showClearButton(items);
  }
};

export const addTask = (value) => {
  const items = getStorage();
  const container = document.querySelector(".todo-list");
  const fragment = document.createDocumentFragment();
  const newItem = {
    id: "task1",
    title: value,
    completed: false,
  };
  renderItem(newItem, fragment);
  container.appendChild(fragment);
  if (!items || items.length === 0) {
    localStorage.setItem("mydayapp-js", JSON.stringify([newItem]));
    showContent();
    updateTotalTasks([newItem]);
    showClearButton([newItem]);
  } else {
    newItem.id = `task${items.length + 1}`;
    localStorage.setItem("mydayapp-js", JSON.stringify([...items, newItem]));
    updateTotalTasks([...items, newItem]);
    showClearButton([...items, newItem]);
  }
};

export const clearTasks = () => {
  const storage = localStorage.getItem("mydayapp-js");
  const items = storage ? JSON.parse(storage) : [];
  const incompleteItems = items.filter((item) => !item.completed);
  localStorage.setItem("mydayapp-js", JSON.stringify(incompleteItems));
  const list = document.querySelector(".todo-list");
  if (list) {
    list.innerHTML = "";
  }
  if (incompleteItems.length === 0) {
    hideContent();
  } else {
    renderItems(incompleteItems);
  }
  updateTotalTasks(incompleteItems);
  showClearButton([]);
};

export const filterTasks = (type) => {
  const storage = localStorage.getItem("mydayapp-js");
  const items = storage ? JSON.parse(storage) : [];
  let filterItems = items;
  if (type === "pending") {
    filterItems = items.filter((item) => !item.completed);
  } else if (type === "completed") {
    filterItems = items.filter((item) => item.completed);
  }
  const list = document.querySelector(".todo-list");
  if (list) {
    list.innerHTML = "";
  }
  renderItems(filterItems);
  updateTotalTasks(filterItems);
};

const hideContent = () => {
  //Función para esconder las barras
  const mainElement = document.querySelector("#main");
  const footerElement = document.querySelector("#footer");
  if (mainElement) {
    mainElement.style.display = "none";
  }
  if (footerElement) {
    footerElement.style.display = "none";
  }

  document.removeEventListener("DOMContentLoaded", hideContent);
};

const showContent = () => {
  //Función para mostrar las barras
  const mainElement = document.querySelector("#main");
  const footerElement = document.querySelector("#footer");
  if (mainElement) {
    mainElement.style.display = "block";
  }
  if (footerElement) {
    footerElement.style.display = "block";
  }
};

const getStorage = () => {
  const items = localStorage.getItem("mydayapp-js");
  return items ? JSON.parse(items) : null;
};

const renderItems = (items) => {
  const container = document.querySelector(".todo-list");
  const fragment = document.createDocumentFragment();

  for (const item of items) {
    renderItem(item, fragment);
  }

  container.appendChild(fragment);
};

const renderItem = (item, fragment) => {
  const newListItem = document.createElement("li");
  if (item.completed) {
    newListItem.className = "completed";
  }

  const newListDiv = document.createElement("div");
  newListDiv.className = "view";

  const newListCheckBox = document.createElement("input");
  newListCheckBox.className = "toggle";
  newListCheckBox.type = "checkbox";
  newListCheckBox.checked = item.completed;
  newListCheckBox.onclick = () => {
    item.completed = !item.completed;
    newListCheckBox.checked = item.completed;
    if (item.completed) {
      newListItem.className = "completed";
    } else {
      newListItem.className = "";
    }
    updateTask(item);
  };

  const newListItemLabel = document.createElement("label");
  newListItemLabel.textContent = item.title;
  newListItemLabel.addEventListener("dblclick", () => {
    const editingItem = document.querySelector("li.editing");
    if (editingItem) {
      editingItem.classList.remove("editing");
    }
    newListItem.className = "editing";
    const elementsToHide = document.querySelectorAll(
      ".todo-list li:not(.editing)"
    );
    elementsToHide.forEach((e) => (e.style.display = "none"));
    newEditInput.focus();
  });

  const destroyItemButton = document.createElement("button");
  destroyItemButton.className = "destroy";
  destroyItemButton.onclick = () => {
    removeTask(item);
    newListItem.remove();
  };

  newListDiv.appendChild(newListCheckBox);
  newListDiv.appendChild(newListItemLabel);
  newListDiv.appendChild(destroyItemButton);

  const newEditInput = document.createElement("input");
  newEditInput.className = "edit";
  newEditInput.value = item.title;
  newEditInput.addEventListener("keyup", (event) => {
    if (event.key === "Escape" || event.key === "Enter") {
      if (event.key === "Escape") {
        newListItem.className = "";
      } else if (event.key === "Enter") {
        if (event.target.value) {
          item.title = event.target.value.trim();
          updateTask(item);
          newListItemLabel.textContent = item.title;
        }
        const editingElement = document.querySelector(".editing");
        if (item.completed) {
          editingElement.className = "completed";
        } else {
          editingElement.className = "";
        }
      }
      const elementsToShow = document.querySelectorAll(".todo-list li");
      elementsToShow.forEach((e) => (e.style.display = "block"));
    }
  });

  newListItem.appendChild(newListDiv);
  newListItem.appendChild(newEditInput);

  fragment.appendChild(newListItem);

  return fragment;
};

const updateTask = (item) => {
  const items = getStorage();
  const newItems = items.map((i) => {
    if (i.id === item.id) {
      return {
        ...i,
        title: item.title,
        completed: item.completed,
      };
    } else {
      return i;
    }
  });
  localStorage.setItem("mydayapp-js", JSON.stringify(newItems));
  showClearButton(newItems);
};

const removeTask = (item) => {
  const items = getStorage();
  const newItems = items.filter((i) => i.id !== item.id);
  localStorage.setItem("mydayapp-js", JSON.stringify(newItems));
  if (newItems.length === 0) {
    hideContent();
  }
  updateTotalTasks(newItems);
  showClearButton(newItems);
};

const updateTotalTasks = (items) => {
  const fragment = document.createDocumentFragment();
  const strong = document.createElement("strong");
  strong.textContent = items.length;
  const fragmentText = document.createDocumentFragment();
  fragmentText.textContent = items.length === 1 ? " item left" : " items left";
  fragment.appendChild(strong);
  fragment.appendChild(fragmentText);
  const counter = document.querySelector(".todo-count");
  counter.innerHTML = "";
  counter.appendChild(fragment);
};

const showClearButton = (items) => {
  const button = document.querySelector(".clear-completed");
  const completedItems = items.filter((e) => e.completed);
  if (completedItems.length > 0) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
};
