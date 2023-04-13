export function editingMode({ target: { offsetParent: liContainer } }) {
  const { lastChild: input } = liContainer;
  liContainer.classList.toggle("editing"); // se agrega la clase al Contenedor para acceder a al modo editar
  input.focus();

  // se almacenan los valores del ID y del valor por defecto del input
  const initialValue = this.innerText; // se almacena el valor iniciar del input

  input.addEventListener("keydown", ({ key }) => {
    if (key === "Enter") {
      const id = liContainer.dataset.id;
      const updatedTask = input.value.trim();
      import("src/js/data/Tasks").then((module) =>
        module.taskPlanner.updateTask(id, updatedTask)
      );
      import("src/js/logic/setterLocalStorage").then((module) =>
        module.setterLocalStorage()
      );
      import("src/js/UI/renderUI").then((module) => module.renderUI());
    } else if (key === "Escape") {
      input.value = initialValue;
      liContainer.classList.remove("editing");
    }
  });
}
