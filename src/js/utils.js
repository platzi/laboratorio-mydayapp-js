import {filterTasks} from "./uiUtils"

export function checkFilterApplied() {
   let filter = window.location.hash;
   if (filter == "#/" || "") {
      filter = "all"
   } else {
      filter = filter.replace("#/","");
   }

   filterTasks(filter);
}

export const sayHello = (text) => {
  return text;
};
