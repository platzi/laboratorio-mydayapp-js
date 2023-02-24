export const mainFooterDisplayValidator = () => {
  const totalList = document.querySelector(".todo-list");

  if (!totalList.innerText.length) {
    const mainTarget = document.querySelector(".main");
    mainTarget.style.display = "none";

    const footerTarget = document.querySelector(".footer");
    footerTarget.style.display = "none";
  }
};

export const elementGenerator = (element) => document.createElement(element);

export const generalTodoListGenerator = (todos) => {
  const todoListTarget = document.querySelector(".todo-list");
  todoListTarget.innerHTML = "";

  todos.forEach((item, index) => {
    todoListTarget.append(createNewTodo(item.title, index, todos));
  });
};
export const createNewTodo = (todo, index, todos) => {
  const listElement = elementGenerator("li");

  const viewDiv = elementGenerator("div");
  viewDiv.className = "view";

  const checkboxInput = elementGenerator("input");
  checkboxInput.type = "checkbox";
  checkboxInput.className = "toggle";
  checkboxInput.addEventListener("click", (e) => {
    if (e.target.checked) {
      listElement.className = "completed";
      todos[index].completed = true;
    } else {
      listElement.classList.remove("completed");
      todos[index].completed = false;
    }
    console.log(todos);
  });

  const todoLabel = elementGenerator("label");
  todoLabel.innerText = todo;

  const todoDeleteButton = elementGenerator("button");
  todoDeleteButton.className = "destroy";
  todoDeleteButton.addEventListener("click", () => {
    todos.splice(index, 1);
    generalTodoListGenerator(todos);
  });

  const editTodoInput = elementGenerator("input");
  editTodoInput.className = "edit";
  editTodoInput.value = todo;

  viewDiv.append(checkboxInput, todoLabel, todoDeleteButton);
  listElement.append(viewDiv, editTodoInput);

  return listElement;
};
