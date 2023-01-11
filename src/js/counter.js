import { todoList } from ".."
export function counter(NumberConfiguration) {
  //localStorage
  // let localArr = JSON.parse(localStorage.getItem('mydayapp-js'))
  // let completedArr = JSON.parse(localStorage.getItem('mydayapp-js-completed'))
  // let pendingArr = JSON.parse(localStorage.getItem('mydayapp-js-pending'))

  const span = document.querySelector(".todo-count")
  const strong = document.querySelector("strong")
  const numberOfItem = todoList.filter(element => element.visible === true
  );
  console.log("lengthList", numberOfItem.length);

  if (numberOfItem.length != 1) {
    span.innerHTML = ""
    span.append(`${numberOfItem.length} items`);
  } else {
    span.innerHTML = "";
    span.append(`${numberOfItem.length} item`);
  };
}

