import "./css/base.css";

import { sayHello } from "./js/utils";
import DomEvents from "./js/events";
import Start from "./js/start";

console.log(sayHello("Hello"));
const domEvents = new DomEvents();
const start = new Start();
domEvents.init();
start.init();
