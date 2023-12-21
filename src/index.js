import "./css/base.css";
import {
  addEventToToDoInput,
  addHashListenerToDocument,
  addCompletedCleanerListenerToButton,
} from "./js/eventsAssigner";
import { routeTo } from "./js/routes";
import { ToDosCollection } from "./js/models/toDosCollection";

const toDosCollection = new ToDosCollection();
toDosCollection.loadAll();

addHashListenerToDocument(toDosCollection);
addCompletedCleanerListenerToButton(toDosCollection);
addEventToToDoInput(toDosCollection);

const newHash = new URL(document.URL).hash;
routeTo(newHash, toDosCollection);
