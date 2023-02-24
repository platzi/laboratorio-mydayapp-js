import {
  listGenerator,
  mfControl,
  footerItemsControl,
} from "./renderutilities";
import { newInputHandler, tasksEvents, cleanEvent } from "./eventsSystem";
import { store } from "../index";

const reRender = (target, prop, value) => {
  target[prop] = value;
  if (Array.isArray(target) == true) {
    console.log("entro al menejo de arrays", target)
    mfControl(target);
    listGenerator(target);
    footerItemsControl(target.filter((element) => element.completed == false));
  } else {
    console.log("entro al menejo de objeto", target)
    mfControl(target.data);
    listGenerator(target.data);
    footerItemsControl(
      target.data.filter((element) => element.completed == false)
    );
  }
  tasksEvents(store);
  return true;
};

const firstRender = (store) => {
  listGenerator(store.list.data);
  mfControl(store.list.data);
  newInputHandler(store);
  tasksEvents(store);
  cleanEvent(store);
};

export { reRender, firstRender };
