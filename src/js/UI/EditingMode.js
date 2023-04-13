import { setterLocalStorage } from "../logic/setterLocalStorage";
import { renderUI } from "../UI/renderUI";
import { taskPlanner } from "../data/Tasks";

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
      taskPlanner.updateTask(id, updatedTask);
      setterLocalStorage();
      renderUI();
    } else if (key === "Escape") {
      input.value = initialValue;
      liContainer.classList.remove("editing");
    }
  });
}
