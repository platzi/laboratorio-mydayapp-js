import { TODOS } from "./store";
import { renderTodos } from "./utils";

const routes = {
  "/": () => renderTodos(TODOS),
  "/all": () => renderTodos(TODOS),
  "/pending": () => renderTodos(TODOS.filter(TODO => !TODO.completed)),
  "/completed": () => renderTodos(TODOS.filter(TODO => TODO.completed)),
}

export const router = () => {
  let route = location.hash.slice(1).toLocaleLowerCase();
  let render = (!route || !routes[route]) ? routes["/"] : routes[route];
  render();
}