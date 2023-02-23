import "./css/base.css";

import Store from "./js/store";
import { listGenerator, mf_control } from "./js/renderutilities";
import eventsService from "./js/eventsService";

const store = new Store();
listGenerator(store.data);
mf_control(store.data);
eventsService(store);
