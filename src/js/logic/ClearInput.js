export function clearInput() {
  import("src").then((module) => (module.inputNewTodo.value = ""));
}
