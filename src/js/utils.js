const addItem = (item, todoList) => {
  todoList.push(item);

  localStorage.setItem("mydayapp-js", JSON.stringify(todoList));
};

const removeItem = (id, todoList) => {
  const index = todoList.findIndex((todo) => {
    console.log(todo.id, id);
    return todo.id === id;
  });
  todoList.splice(index, 1);
  localStorage.setItem("mydayapp-js", JSON.stringify(todoList));
};

const checkItem = (id, todoList, value) => {
  const index = todoList.findIndex(
    (todo) => todo.id.toString() === id.toString()
  );

  todoList[index].completed = value;

  console.log(todoList);
  localStorage.setItem("mydayapp-js", JSON.stringify(todoList));
};

const editItem = () => {};

const clearCompletedItems = (todoList) => {
  const todoListFiltered = todoList.filter((todo) => !todo.completed);

  localStorage.setItem("mydayapp-js", JSON.stringify(todoListFiltered));
};

export { addItem, removeItem, checkItem, editItem, clearCompletedItems };
