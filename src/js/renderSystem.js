import {
  listGenerator,
  mfControl,
  footerItemsControl,
  listFilter,
  footerSelectedControl,
  cleanCompletesButtonControl,
} from "./renderutilities";
import {
  newInputHandler,
  cleanEvent,
  saveStateBeforeExit,
  hashChange,
} from "./eventsSystem";

import { store } from "../index";

const reRender = (target, prop, value) => {
  target[prop] = value;
  store.saveList();
  mfControl(store.list.data);
  listGenerator(listFilter(store.list.data));
  footerItemsControl(
    store.list.data.filter((element) => element.completed == false)
  );
  cleanCompletesButtonControl(
    store.list.data.filter((element) => element.completed == true)
  );
  return true;
};

const firstRender = (store) => {
  listGenerator(listFilter(store.list.data));
  mfControl(store.list.data);
  newInputHandler(store);
  cleanEvent(store);
  footerItemsControl(
    store.list.data.filter((element) => element.completed == false)
  );
  saveStateBeforeExit(store);
  hashChange(store.list.data);
  footerSelectedControl();
  cleanCompletesButtonControl(
    store.list.data.filter((element) => element.completed == true)
  );
};

export { reRender, firstRender };
