export function counter(NumberConfiguration) {
  //localStorage
  let localArr = JSON.parse(localStorage.getItem('mydayapp-js'))
  let completedArr = JSON.parse(localStorage.getItem('mydayapp-js-completed'))
  let pendingArr = JSON.parse(localStorage.getItem('mydayapp-js-pending'))

  const span = document.querySelector(".todo-count")
  const strong = document.querySelector("strong")
  console.log("param", NumberConfiguration);

  if (NumberConfiguration == 0) {
    span.innerHTML = ""

    validate(localArr)
  } else if (NumberConfiguration == 1) {
    span.innerHTML = ""

    validate(completedArr)

  } else if (NumberConfiguration == 2) {
    span.innerHTML = ""

    validate(pendingArr)

  }

  function validate(ArrForValidate) {
    if (ArrForValidate.length != 1) {
      // span.innerHTML = ""
      span.append(`${ArrForValidate.length} items`);
    } else {
      // span.innerHTML = "";
      span.append(`${ArrForValidate.length} item`);
    };
  }
}
