export const todoCounterGenerator = () => {
  const todos = JSON.parse(localStorage.getItem("mydayapp-js"));
  console.log(todos);
  if (!todos) return;
  const pendingTodos = todos.filter((item) => !item.completed);
  console.log({ pendingTodos });
  const todoCounterTarget = document.querySelector(".todo-count");
  todoCounterTarget.innerHTML = `<strong>${pendingTodos.length}</strong> ${
    pendingTodos.length <= 1 ? "item" : "items"
  } left</span>`;
};
