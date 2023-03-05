export const todoContainer = document.querySelector("ul.todo-list");
export const mainContainer = document.querySelector(".main");
export const footerContainer = document.querySelector(".footer");

// To know how many task we have

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

// To add new Task to DOM

export const addTodo = (value) => {
  const todoHTML = `<li>
                      <div class="view">
                        <input class="toggle" type="checkbox" />
                        <label>${value}</label>
                        <button class="destroy"></button>
                      </div>
                      <input class="edit" value="${value}" />
                    </li>`;
  todoContainer.insertAdjacentHTML("beforeend", todoHTML);
};
