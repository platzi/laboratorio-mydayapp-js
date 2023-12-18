import "./css/base.css";
import { addEventToToDoInput, addHashListenerToDocument } from "./js/utils";
import { routeTo } from './js/routes/todos';
import { ToDos } from './js/models/todo';

const TODOS = new ToDos();
TODOS.loadAll();

console.log(TODOS)
addHashListenerToDocument(TODOS);
addEventToToDoInput(TODOS);

const newHash = new URL(document.URL).hash
routeTo(newHash, TODOS)
