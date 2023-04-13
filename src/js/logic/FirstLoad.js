import { getterLocalStorage } from "src/js/logic/setterLocalStorage.js";
//la logica empleada para la primera carga de la aplicacion

export const firstLoad = () => {
  const tasks = getterLocalStorage();

  if (!tasks || !tasks.length) {
    import("src/js/logic/setterLocalStorage.js").then((module) =>
      module.setterLocalStorage()
    );
    import("src/js/logic/VerifyTaskLIstArray").then((module) =>
      module.verifyTaskLIstArray()
    );
  } else {
    tasks.forEach((task) =>
      import("src/js/data/Tasks").then((module) =>
        module.taskPlanner.addTask(task)
      )
    );
    import("src/js/logic/VerifyTaskLIstArray").then((module) =>
      module.verifyTaskLIstArray()
    );
    import("src/js/UI/renderUI").then((module) => module.renderUI());
  }
  removeEventListener("load", firstLoad);
};
