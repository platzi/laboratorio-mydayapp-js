import "./css/base.css";

import Store from "./js/store";
import { firstRender } from "./js/renderSystem";

const store = new Store();
firstRender(store);

export { store };
