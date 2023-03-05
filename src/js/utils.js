export const todoContainer = document.querySelector("ul.todo-list");
export const mainContainer = document.querySelector(".main");
export const footerContainer = document.querySelector(".footer");

export const checkTaskNumber = () => {
  const taskCount = todoContainer.childElementCount;
  console.log(taskCount);
  if (taskCount == 0) {
    mainContainer.classList.add("hidden");
    footerContainer.classList.add("hidden");
  } else {
    mainContainer.classList.remove("hidden");
    footerContainer.classList.remove("hidden");
  }
};
