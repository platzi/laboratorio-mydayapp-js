export const clearCompletedButton = (toDosCollection, controller) => {
  const button = document.createElement("button");
  button.classList.add("clear-completed");
  button.id = "clear_completed_button";
  button.innerHTML = "Clear completed";
  button.onclick = () => {
    controller.destroyCompleted(toDosCollection);
  };

  if (toDosCollection.countCompleted() === 0) button.hidden = true;

  return button;
};
