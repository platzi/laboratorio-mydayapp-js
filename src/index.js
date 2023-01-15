import "./css/base.css";

import { sayHello } from "./js/utils";
import { header, newTodoInput } from "./js/domElements";

// console.log(sayHello("Hello"));
// console.log(header);
// console.log(newTodoInput);


const getInputValue = (input) => {
  return input.target.value;
}

let newTodoInputValue = getInputValue;

newTodoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter'){
    console.log(newTodoInputValue(e));
    e.target.value = '';
  }
});