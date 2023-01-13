import { todoList } from ".."
export function counter() {
  //localStorage
  const span = document.querySelector(".todo-count")
  const numberOfItem = todoList.filter(element => element.visible === true
  );
  //renderización de la cantidad de tareas  
  if (numberOfItem.length != 1) {
    span.innerHTML = ""
    span.innerHTML = `<strong>${numberOfItem.length}</strong> items left`;
  } else {
    span.innerHTML = "";
    span.innerHTML = `<strong>${numberOfItem.length}</strong> item left`;
  };
}

