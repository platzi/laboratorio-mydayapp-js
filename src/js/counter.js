export const todoCounterGenerator = () => {
  const todos = JSON.parse(localStorage.getItem("mydayapp-js"));
  if (!todos) return;
  const pendingTodos = todos.filter((item) => !item.completed);
  const todoCounterTarget = document.querySelector(".todo-count");
  todoCounterTarget.innerHTML = `<strong>${pendingTodos.length}</strong> ${
    pendingTodos.length === 1 ? "item" : "items"
  } left</span>`;
};
