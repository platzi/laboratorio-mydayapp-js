export const addItem = (item, todoList) => {
  todoList.push(item);
  
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

export const removeItem = () => { }

export const editItem = () => { }
