import {
  listGenerator,
  mfControl,
  footerItemsControl,
  listFilter,
  footerSelectedControl,
} from "./renderutilities";
import {
  newInputHandler,
  tasksEvents,
  cleanEvent,
  saveStateBeforeExit,
  hashChange,
} from "./eventsSystem";
import { store } from "../index";

const reRender = (target, prop, value) => {
  target[prop] = value;
  if (Array.isArray(target) == true) {
    mfControl(target);
    listGenerator(listFilter(target));
    footerItemsControl(target.filter((element) => element.completed == false));
  } else {
    mfControl(target.data);
    listGenerator(listFilter(target));
    footerItemsControl(
      target.data.filter((element) => element.completed == false)
    );
  }
  tasksEvents(store);
  return true;
};

const firstRender = (store) => {
  listGenerator(listFilter(store.list.data));
  mfControl(store.list.data);
  newInputHandler(store);
  tasksEvents(store);
  cleanEvent(store);
  footerItemsControl(
    store.list.data.filter((element) => element.completed == false)
  );
  saveStateBeforeExit(store);
  hashChange(store.list.data);
  footerSelectedControl();
};

export { reRender, firstRender };
