export function counter() {
  //localStorage
  let localArr = JSON.parse(localStorage.getItem('mydayapp-js'))

  const span = document.querySelector(".todo-count")
  const strong = document.querySelector("strong")

  if (localArr.length === 0) {
    return
  }
  else if (localArr.length != 1) {
    span.innerHTML = ""
    span.append(`${localArr.length} items`);
  } else {
    span.innerHTML = "";
    span.append(`${localArr.length} item`);
  };
}