import { listGenerator, mf_control } from "./renderutilities";
import { newInputHandler, getTasks } from "./eventsSystem";
import { store } from "../index";

const reRender = (target, prop, value) => {
  target[prop] = value;
  mf_control(target);
  listGenerator(target);
  getTasks(store);
  return true;
};

const firstRender = (store) => {
  listGenerator(store.data);
  mf_control(store.data);
  newInputHandler(store);
  getTasks(store);
};

export { reRender, firstRender };
