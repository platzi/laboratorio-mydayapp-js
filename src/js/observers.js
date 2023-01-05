import { checkForCompletedTask, updateCounter } from "./crud.js";

export const observeTaskList = () =>{
  let observer = new MutationObserver(function (mutations) {
    let main = document.getElementsByClassName("main")[0];
    let footer = document.getElementsByClassName("footer")[0];
    mutations.forEach(function (mutation) {
      if (mutation.target.childElementCount === 0) {
        main.classList.add("hidden");
        footer.classList.add("hidden");
      } else {
        main.classList.remove("hidden");
        footer.classList.remove("hidden");
      }
      checkForCompletedTask();
      updateCounter();
    });
  });

  observer.observe(document.getElementsByClassName("todo-list")[0], {
    childList: true,
  });
}
