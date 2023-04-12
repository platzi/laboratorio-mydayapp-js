import { clearInput } from "../logic/ClearInput";
import { addTodoList } from "./AddTodoList";

export const inputValue = (text) => {
  text.trim().toLowerCase();
  if (text !== "") {
    addTodoList(text);
  }
  clearInput();
};
