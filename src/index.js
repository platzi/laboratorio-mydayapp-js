import "./css/base.css";

import { sayHello } from "./js/utils";
import {todos_list, addTodo} from "./js/todos_list"

import {showTodos} from "./js/showTodos"



addTodo("hola",false);
addTodo("hola",false);
addTodo("hola",false);


const htmlTodoList = document.querySelector(".todo-list")

htmlTodoList.innerHTML = showTodos();
