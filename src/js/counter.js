export function counter() {
  //localStorage
  const todo_count = document.querySelector(".todo-count");
  const li_all = document.querySelectorAll(".todo-list li");
  todo_count.innerHTML = "";

  if (li_all.length === 0) {
    todo_count.innerHTML = `<strong>0</strong> items left`;
  } else if (li_all.length === 1) {
    todo_count.innerHTML = `<strong>${li_all.length}</strong> item left`;
  } else {
    todo_count.innerHTML = `<strong>${li_all.length}</strong> items left`;
  }
}
