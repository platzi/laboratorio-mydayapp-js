import { clearInput } from "../logic/ClearInput";
import { $inputNewTodo } from "../node/node";
import { addTodoList } from "./AddTodoList";

export const inputValue = () => {
  const text = $inputNewTodo.value.trim().toLowerCase();
  if (text !== "") {
    addTodoList(text);
  }
  clearInput();
};
