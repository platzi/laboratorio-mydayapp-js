import { listGenerator, mf_control } from "./renderutilities";
import { newInputHandler, tasksEvents } from "./eventsSystem";
import { store } from "../index";

const reRender = (target, prop, value) => {
  target[prop] = value;
  mf_control(target);
  listGenerator(target);
  tasksEvents(store);
  return true;
};

const firstRender = (store) => {
  listGenerator(store.data);
  mf_control(store.data);
  newInputHandler(store);
  tasksEvents(store);
};

export { reRender, firstRender };
