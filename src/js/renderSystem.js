import {
  listGenerator,
  mfControl,
  footerItemsControl,
} from "./renderutilities";
import { newInputHandler, tasksEvents } from "./eventsSystem";
import { store } from "../index";

const reRender = (target, prop, value) => {
  target[prop] = value;
  mfControl(target);
  listGenerator(target);
  footerItemsControl(target.filter((element) => element.completed == false));
  tasksEvents(store);
  return true;
};

const firstRender = (store) => {
  listGenerator(store.data);
  mfControl(store.data);
  newInputHandler(store);
  tasksEvents(store);
};

export { reRender, firstRender };
