const $ = (selector) => document.querySelector(selector);
const create = (element) => document.createElement(element);

export const main = $(".main");
export const todoList = $(".todo-list");
export const footer = $(".footer");
export const filters = $(".filters");

// buttons

export const clearCompleted = $(".clear-completed");
export const all = $(".filters > li:first-child > a");
export const pending = $(".filters > li:nth-child(2) > a");
export const completed = $(".filters > li:nth-child(3) > a");
