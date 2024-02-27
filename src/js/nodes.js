const $ = (selector) => document.querySelector(selector);
const create = (element) => document.createElement(element);

export const main = $(".main");
export const todoList = $(".todo-list");
export const footer = $(".footer");
export const filters = $(".filters");

// buttons

export const clearCompleted = $(".clear-completed");
