export const inputValue = (text) => {
  text.trim().toLowerCase();
  if (text !== "") {
    import("src/js/UI/AddTodoList").then((module) => module.addTodoList(text));
  }
  import("src/js/logic/ClearInput").then((module) => module.clearInput());
};
