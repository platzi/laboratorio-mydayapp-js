// export const sayHello = (text) => {
//   return text;
// };

import { getTasks, setTask, removeTask } from "./storage"

export function itemChage(e, state) {
  e.parentElement.parentElement.classList.toggle("completed")
  const itemCompletedState = getTasks().find((item) => {
    if (item.id === e.classList[1]) {
      item.completed = state
      removeTask(item)
      return item
    }
  })
  setTask(itemCompletedState)
}

export function numbersItemsLeft(taskList) {
  const itemsLeft = taskList.filter((item) => item.completed === false)
  return itemsLeft.length
}
